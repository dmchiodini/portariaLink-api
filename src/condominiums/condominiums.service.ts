// src/condominiums/condominiums.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCondominiumDto } from './dto/create-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium.dto';

@Injectable()
export class CondominiumsService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateCondominiumDto) {
    return this.prisma.condominium.create({ data: dto });
  }

  async findAll() {
    return this.prisma.condominium.findMany();
  }

  async findOne(id: string) {
    const condominium = await this.prisma.condominium.findUnique({ where: { id } });
    if (!condominium) throw new NotFoundException('Condomínio não encontrado');
    return condominium;
  }

  async update(id: string, dto: UpdateCondominiumDto) {
    await this.findOne(id);
    return this.prisma.condominium.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.condominium.delete({ where: { id } });
    return { message: 'Condomínio removido com sucesso' };
  }
}
