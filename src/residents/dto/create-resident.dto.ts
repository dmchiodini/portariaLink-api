import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateResidentDto {
  @ApiProperty({ description: 'Nome do morador' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Telefone do morador' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ description: 'Apartamento do morador' })
  @IsNotEmpty()
  @IsString()
  apartment: string;
}
