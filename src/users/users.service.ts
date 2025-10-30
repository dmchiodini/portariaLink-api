import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';
import { UserRoleEnum } from 'src/common/enums/user-role.enum';
import { JwtPayload } from 'src/common/types/jwt-payload.type';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) { }

  async create(dto: CreateUserDto, user: JwtPayload) {
    const existingUser = await this.findOneByEmail(dto.email);

    if (existingUser) throw new BadRequestException('O e-mail já está em uso.');

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: dto.role ?? UserRoleEnum.PORTER,
        condominiumId: user.condominiumId,
      },
    });
  }

  async findAll(user: JwtPayload) {
    const users = await this.prisma.user.findMany({
      where: { condominiumId: user.condominiumId },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        condominiumId: true
      },
    });

    return users;
  }

  async findOne(id: string, user: JwtPayload) {
    const found = await this.prisma.user.findFirst({
      where: { id, condominiumId: user.condominiumId },
    });
    if (!found) throw new NotFoundException('Usuário não encontrado.');
    return found;
  }

  async findOneByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: string, dto: UpdateUserDto, user: JwtPayload) {
    await this.findOne(id, user);

    const data = { ...dto };
    if (dto.password) {
      data.password = await bcrypt.hash(dto.password, 10);
    }

    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async remove(id: string, user: JwtPayload) {
    await this.findOne(id, user);
    await this.prisma.user.delete({ where: { id } });
    return { message: 'Usuário removido com sucesso' };
  }
}
