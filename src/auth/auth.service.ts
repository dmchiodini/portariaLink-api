import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { UserRoleEnum } from 'src/common/enums/user-role.enum';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) throw new UnauthorizedException('Credenciais inválidas');

    return user;
  }

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto.email, dto.password);

    const condominium = await this.prisma.condominium.findUnique({ where: { id: user.condominiumId } })

    const payload = { sub: user.id, role: user.role, condominiumId: user.condominiumId };
    const accessToken = this.jwtService.sign(payload);

    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        condominium: condominium?.name,
        condominiumId: user.condominiumId
      },
      accessToken,
    };
  }

  async registerAdmin(dto: RegisterDto) {
    const existingAdmin = await this.prisma.user.findFirst({
      where: { email: dto.email },
    });

    if (existingAdmin) {
      throw new BadRequestException(
        'E-mail já está cadastrado nesta plataforma.',
      );
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    const condominium = await this.prisma.condominium.create({
      data: {
        name: dto.condominiumName,
      },
    });

    return this.prisma.user.create({
      data: {
        name: dto.name,
        email: dto.email,
        password: hashedPassword,
        role: UserRoleEnum.ADMIN,
        condominiumId: condominium.id,
      },
    });
  }
}
