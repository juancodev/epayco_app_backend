import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { CreateClientDto } from './dto/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(
    @InjectRepository(Client)
    private clientsRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    const existing = await this.clientsRepository.findOne({
      where: [
        { documento: createClientDto.documento },
        { email: createClientDto.email },
      ],
    });

    if (existing) {
      throw new ConflictException('Ya existe un cliente con ese documento o correo');
    }

    const client = this.clientsRepository.create(createClientDto);
    return this.clientsRepository.save(client);
  }

  async findByDocumentoAndCelular(documento: string, celular: string): Promise<Client> {
    const client = await this.clientsRepository.findOne({
      where: { documento, celular },
    });

    if (!client) {
      throw new NotFoundException('Cliente no encontrado con ese documento y celular');
    }

    return client;
  }

  async updateSaldo(clientId: string, nuevoSaldo: number): Promise<void> {
    await this.clientsRepository.update(clientId, { saldo: nuevoSaldo });
  }

  async findByDocumento(documento: string): Promise<Client | null> {
    return this.clientsRepository.findOne({ where: { documento } });
  }
}
