import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCondominiumDto {
  @ApiProperty({ description: 'Nome do condomínio' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Endereço do condomínio' })
  @IsOptional()
  @IsString()
  address?: string;
}
