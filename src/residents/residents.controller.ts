import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ResidentsService } from './residents.service';
import { CreateResidentDto } from './dto/create-resident.dto';
import { UpdateResidentDto } from './dto/update-resident.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { buildResponse } from 'src/common/response/response.helper';
import { ApiResponse } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('residents')
export class ResidentsController {
  constructor(private readonly residentsService: ResidentsService) { }

  @Post()
  @ApiResponse({ status: 200, description: 'Morador cadastrado com sucesso' })
  async create(@Body() dto: CreateResidentDto, @Req() req) {
    const condominiumId = req.user.condominiumId
    const resident = await this.residentsService.create(dto, condominiumId);
    return buildResponse(201, 'Morador criado com sucesso', resident);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de moradores  obtida com sucesso' })
  async findAll(@Req() req) {
    const residents = await this.residentsService.findAll(req.user);
    return buildResponse(200, 'Lista de moradores obtida com sucesso', residents);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Morador encontrado' })
  async findOne(@Param('id') id: string, @Req() req) {
    const resident = await this.residentsService.findOne(id, req.user);
    return buildResponse(200, 'Morador encontrado', resident);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Morador atualizado com sucesso' })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateResidentDto,
    @Req() req,
  ) {
    const updated = await this.residentsService.update(id, dto, req.user);
    return buildResponse(200, 'Morador atualizado com sucesso', updated);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Morador removido com sucesso' })
  async remove(@Param('id') id: string, @Req() req) {
    const result = await this.residentsService.remove(id, req.user);
    return buildResponse(200, result.message, null);
  }
}
