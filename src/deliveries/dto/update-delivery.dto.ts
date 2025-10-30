import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryDto } from './create-delivery.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { DeliveryStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateDeliveryDto extends PartialType(CreateDeliveryDto) {
  @ApiProperty({ description: 'Status da encomenda' })
  @IsOptional()
  @IsEnum(DeliveryStatus)
  status?: DeliveryStatus;
}
