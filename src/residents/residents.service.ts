import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { JwtPayload } from 'src/common/types/jwt-payload.type';

@Injectable()
export class ResidentsService {
  constructor(private readonly prisma: PrismaService) { }

  async create(dto: CreateResidentDto, user: JwtPayload) {
    const apartmentExists = await this.findOneByApartment(dto.apartment)

    if (apartmentExists) {
      throw new BadRequestException("Apartamento já cadastrado");
    }

    return this.prisma.resident.create({
      data: {
        name: dto.name,
        phone: dto.phone,
        apartment: dto.apartment.toUpperCase(),
        condominiumId: user.condominiumId,
      },
    });
  }

  async findAll(user: JwtPayload) {
    return this.prisma.resident.findMany({
      where: { condominiumId: user.condominiumId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, user: JwtPayload) {
    const resident = await this.prisma.resident.findFirst({
      where: { id, condominiumId: user.condominiumId },
    });

    if (!resident) {
      throw new NotFoundException('Morador não encontrado');
    }

    return resident;
  }

  async findOneByApartment(ap: string) {
    const apToUpperCase = ap.toUpperCase()
    return this.prisma.resident.findFirst({ where: { apartment: apToUpperCase } })
  }

  async update(id: string, dto: UpdateResidentDto, user: JwtPayload) {
    await this.findOne(id, user);

    return this.prisma.resident.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string, user: JwtPayload) {
    await this.findOne(id, user);
    await this.prisma.resident.delete({ where: { id } });
    return { message: 'Morador removido com sucesso' };
  }
}
