import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ description: 'Nome do usuário' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'E-mail do usuário' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @MinLength(6)
  password: string;

  @ApiProperty({ description: 'Condomínio do usuário' })
  @IsNotEmpty()
  condominiumName: string;
}