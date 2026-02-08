import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ConfirmPaymentDto {
  @IsNotEmpty({ message: 'El id de la transacción es requerido' })
  @IsString()
  sessionId: string;

  @IsNotEmpty({ message: 'El token de la transacción es requerido' })
  @IsString()
  @Length(6, 6, { message: 'El token debe tener 6 caracteres' })
  token: string;
}
