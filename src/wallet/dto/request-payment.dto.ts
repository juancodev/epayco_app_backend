import { IsNotEmpty, IsString, IsNumber, Min } from 'class-validator';

export class RequestPaymentDto {
  @IsNotEmpty({ message: 'El Documento es requerido' })
  @IsString()
  document: string;

  @IsNotEmpty({ message: 'El teléfono celular es requerido' })
  @IsString()
  celular: string;

  @IsNotEmpty({ message: 'El valor es requerido' })
  @IsNumber({}, { message: 'El valor debe ser un número' })
  @Min(1, { message: 'El valor debe ser mayor a 0' })
  valor: number;
}
