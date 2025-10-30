import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
  Req,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { buildResponse } from 'src/common/response/response.helper';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiBearerAuth, ApiResponse } from '@nestjs/swagger';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'Usuário cadastrado com sucesso' })
  async create(@Body() dto: CreateUserDto, @Req() req) {
    const user = await this.usersService.create(dto, req.user);
    return buildResponse(201, 'Usuário criado com sucesso', user);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de usuários obtida com sucesso' })
  async findAll(@Req() req) {
    console.log('Usuário logado:', req.user);
    const users = await this.usersService.findAll(req.user);
    return buildResponse(200, 'Lista de usuários obtida com sucesso', users);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Usuário encontrado' })
  async findOne(@Param('id') id: string, @Req() req) {
    const user = await this.usersService.findOne(id, req.user);
    return buildResponse(200, 'Usuário encontrado', user);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
    @Req() req,
  ) {
    const updated = await this.usersService.update(id, dto, req.user);
    return buildResponse(200, 'Usuário atualizado com sucesso', updated);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso' })
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.usersService.remove(id, req.user);
    return buildResponse(200, result.message, null);
  }
}
