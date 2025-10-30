import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { DeliveryStatusEnum } from 'src/common/enums/delivery-status.enum';

@Injectable()
export class DeliveriesService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateDeliveryDto, condominiumId: string) {
    const resident = await this.prisma.resident.findUnique({
      where: { id: data.residentId },
    });

    if (!resident) {
      throw new NotFoundException('Morador não encontrado');
    }

    const delivery = await this.prisma.delivery.create({
      data: {
        residentId: data.residentId,
        description: data.description,
        status: data.status,
        condominiumId
      },
      select: {
        id: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        resident: true
      },
    });

    return delivery;
  }

  async findAll() {
    return this.prisma.delivery.findMany({
      include: { resident: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByStatus(status: string, condominiumId: string) {
    if (!Object.values(DeliveryStatusEnum).includes(status as DeliveryStatusEnum)) {
      throw new BadRequestException(`Status inválido: ${status}`);
    }

    return this.prisma.delivery.findMany({
      where: {
        status: status as DeliveryStatusEnum,
        condominiumId,
      },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        description: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        resident: true
      },
    })
  }

  async findOne(id: string) {
    const delivery = await this.prisma.delivery.findUnique({
      where: { id },
      include: { resident: true },
    });

    if (!delivery) {
      throw new NotFoundException('Entrega não encontrada');
    }

    return delivery;
  }

  async update(id: string, data: UpdateDeliveryDto) {
    const delivery = await this.prisma.delivery.findUnique({ where: { id } });

    if (!delivery) {
      throw new NotFoundException('Entrega não encontrada');
    }

    return this.prisma.delivery.update({
      where: { id },
      data,
      include: { resident: true },
    });
  }

  async remove(id: string) {
    const delivery = await this.prisma.delivery.findUnique({ where: { id } });

    if (!delivery) {
      throw new NotFoundException('Entrega não encontrada');
    }

    await this.prisma.delivery.delete({ where: { id } });
    return { deleted: true };
  }
}
