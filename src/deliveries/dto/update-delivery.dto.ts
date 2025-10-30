import { PartialType } from '@nestjs/mapped-types';
import { CreateDeliveryDto } from './create-delivery.dto';
import { IsOptional, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DeliveryStatusEnum } from 'src/common/enums/delivery-status.enum';

export class UpdateDeliveryDto extends PartialType(CreateDeliveryDto) {
  @ApiProperty({ description: 'Status da encomenda' })
  @IsOptional()
  @IsEnum(DeliveryStatusEnum)
  status?: DeliveryStatusEnum;
}
