import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
  Query,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { RequestPaymentDto } from './dto/request-payment.dto';
import { RechargeWalletDto } from './dto/recharge-wallet.dto';
import { ConfirmPaymentDto } from './dto/confirm-payment.dto';
import { ApiResponse } from '../common/dto/api-response.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('recargarBilletera')
  @HttpCode(HttpStatus.OK)
  async recargarBilletera(@Body() dto: RechargeWalletDto) {
    const result = await this.walletService.rechargeWallet(dto);
    return ApiResponse.ok('Recarga realizada exitosamente', result);
  }

  @Post('solicitarPago')
  @HttpCode(HttpStatus.OK)
  async solicitarPago(@Body() dto: RequestPaymentDto) {
    const result = await this.walletService.requestPayment(dto);
    return ApiResponse.ok('Solicitud de pago creada', result);
  }

  @Post('confirmarPago')
  @HttpCode(HttpStatus.OK)
  async confirmarPago(@Body() dto: ConfirmPaymentDto) {
    const result = await this.walletService.confirmPayment(dto);
    return ApiResponse.ok('Pago confirmado exitosamente', result);
  }

  @Get('consultarSaldo')
  @HttpCode(HttpStatus.OK)
  async consultarSaldo(
    @Query('documento') documento: string,
    @Query('celular') celular: string,
  ) {
    if (!documento || !celular) {
      return ApiResponse.fail('Documento y celular son obligatorios');
    }
    const result = await this.walletService.checkBalance(documento, celular);
    return ApiResponse.ok('Consulta exitosa', result);
  }
}
