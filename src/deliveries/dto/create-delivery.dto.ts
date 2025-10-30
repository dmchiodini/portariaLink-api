import { IsOptional, IsString, IsUUID, IsEnum } from 'class-validator';
import { DeliveryStatus } from '@prisma/client';
import { DeliveryStatusEnum } from 'src/common/enums/delivery-status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDeliveryDto {
  @ApiProperty({ description: 'ID do morador' })
  @IsUUID()
  residentId: string;

  @ApiProperty({ description: 'Descrição da encomenda' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Status da encomenda' })
  @IsOptional()
  @IsEnum(DeliveryStatusEnum)
  status?: DeliveryStatus;
}
