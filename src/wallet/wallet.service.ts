import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Transaction } from './entities/transaction.entity';
import { ClientsService } from '../clients/clients.service';
import { MailService } from '../mail/mail.service';
import { RequestPaymentDto } from './dto/request-payment.dto';
import { RechargeWalletDto } from './dto/recharge-wallet.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    private clientsService: ClientsService,
    private mailService: MailService,
  ) {}

  private async getClientByTransaction(clientId: string) {
    const client = await this.clientsService.findByDocumento(clientId);

    return client;
  }

  async rechargeWallet(rechargeWalletDto: RechargeWalletDto) {
    const client = await this.clientsService.findByDocumentoAndCelular(
      rechargeWalletDto.document,
      rechargeWalletDto.celular,
    );

    const nuevoSaldo =
      parseFloat(client.saldo.toString()) + rechargeWalletDto.valor;
    await this.clientsService.updateSaldo(client.id, nuevoSaldo);

    return {
      documento: client.documento,
      saldoAnterior: parseFloat(client.saldo.toString()),
      valorRecargado: rechargeWalletDto.valor,
      saldoActual: nuevoSaldo,
    };
  }

  async requestPayment(requestPaymentDto: RequestPaymentDto) {
    const client = await this.clientsService.findByDocumentoAndCelular(
      requestPaymentDto.document,
      requestPaymentDto.celular,
    );

    const saldoActual = parseFloat(client.saldo.toString());
    if (saldoActual < requestPaymentDto.valor) {
      throw new BadRequestException(
        `Saldo insuficiente. Saldo actual: ${saldoActual}, valor solicitado: ${requestPaymentDto.valor}`,
      );
    }

    const token = Math.floor(100000 + Math.random() * 900000).toString();
    const sessionId = uuidv4();
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 3);

    const transaction = this.transactionsRepository.create({
      clientId: client.id,
      monto: requestPaymentDto.valor,
      sessionId,
      token,
      expiresAt,
    });
    await this.transactionsRepository.save(transaction);
    await this.mailService.sendToken(client.email, client.nombres, token);

    return {
      sessionId,
      message: `Token enviado al correo ${client.email}`,
    };
  }

  async confirmPayment(confirmPaymentDto: ConfirmPaymentDto) {
    const transaction = await this.transactionsRepository.findOne({
      where: { sessionId: confirmPaymentDto.sessionId, confirmed: false },
    });

    if (!transaction) {
      throw new NotFoundException(
        'Sesión de pago no encontrada o ya confirmada',
      );
    }

    if (new Date() > transaction.expiresAt) {
      throw new BadRequestException('El token ha expirado');
    }

    if (transaction.token !== confirmPaymentDto.token) {
      throw new BadRequestException('Token incorrecto');
    }

    const client = await this.clientsService.findByDocumento(
      (await this.getClientByTransaction(transaction.clientId))!.documento,
    );

    if (!client) {
      throw new NotFoundException('Cliente no encontrado o no existe');
    }

    const saldoActual = parseFloat(client.saldo.toString());
    const monto = parseFloat(transaction.monto.toString());

    if (saldoActual < monto) {
      throw new BadRequestException('saldo insuficiente');
    }

    const nuevoSaldo = saldoActual - monto;
    await this.clientsService.updateSaldo(client.id, nuevoSaldo);

    transaction.confirmed = true;
    await this.transactionsRepository.save(transaction);

    return {
      transactionId: transaction.id,
      montoDescontado: monto,
      saldoAnterior: saldoActual,
      saldoActual: nuevoSaldo,
    };
  }

  async checkBalance(documento: string, celular: string) {
    const client = await this.clientsService.findByDocumentoAndCelular(
      documento,
      celular,
    );

    return {
      documento: client.documento,
      nombres: client.nombres,
      saldo: client.saldo,
    };
  }
}
