import { IsNotEmpty, IsEmail, IsString, MinLength } from 'class-validator';

export class CreateClientDto {
  @IsNotEmpty({ message: 'El documento es requerido' })
  @IsString()
  documento: string;

  @IsNotEmpty({ message: 'El nombre es requerido' })
  @IsString()
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres' })
  nombres: string;

  @IsNotEmpty({ message: 'El correo es requerido' })
  @IsEmail({}, { message: 'El correo no es válido' })
  email: string;

  @IsNotEmpty({ message: 'El teléfono celular es requerido' })
  @IsString()
  @MinLength(7, {
    message: 'El teléfono celular debe tener al menos 7 dígitos',
  })
  celular: string;
}
