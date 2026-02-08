import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dto/create-client.dto';
import { ApiResponse } from '../common/dto/api-response.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post('registroCliente')
  @HttpCode(HttpStatus.CREATED)
  async registroCliente(@Body() createClientDto: CreateClientDto) {
    const client = await this.clientsService.create(createClientDto);
    return ApiResponse.ok('Cliente registrado exitosamente', {
      id: client.id,
      documento: client.documento,
      nombres: client.nombres,
      email: client.email,
      celular: client.celular,
      saldo: client.saldo,
    });
  }
}
