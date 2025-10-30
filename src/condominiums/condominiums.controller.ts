import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { CondominiumsService } from './condominiums.service';
import { CreateCondominiumDto } from './dto/create-condominium.dto';
import { UpdateCondominiumDto } from './dto/update-condominium.dto';
import { buildResponse } from 'src/common/response/response.helper';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('condominiums')
export class CondominiumsController {
  constructor(private readonly service: CondominiumsService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'Condomínio criada com sucesso' })
  async create(@Body() dto: CreateCondominiumDto) {
    const condominium = await this.service.create(dto);
    return buildResponse(201, 'Condomínio criado com sucesso', condominium);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de condomínios obtida com sucesso' })
  async findAll() {
    const condominiums = await this.service.findAll();
    return buildResponse(200, 'Lista de condomínios obtida com sucesso', condominiums);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Condomínio encontrado' })
  async findOne(@Param('id') id: string) {
    const condominium = await this.service.findOne(id);
    return buildResponse(200, 'Condomínio encontrado', condominium);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Condomínio atualizado com sucesso' })
  async update(@Param('id') id: string, @Body() dto: UpdateCondominiumDto) {
    const updated = await this.service.update(id, dto);
    return buildResponse(200, 'Condomínio atualizado com sucesso', updated);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Condomínio removido com sucesso' })
  async remove(@Param('id') id: string) {
    const result = await this.service.remove(id);
    return buildResponse(200, result.message, null);
  }
}
