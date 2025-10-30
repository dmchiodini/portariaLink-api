import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { DeliveriesService } from './deliveries.service';
import { CreateDeliveryDto } from './dto/create-delivery.dto';
import { UpdateDeliveryDto } from './dto/update-delivery.dto';
import { buildResponse } from 'src/common/response/response.helper';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { ApiResponse } from '@nestjs/swagger';


@UseGuards(JwtAuthGuard)
@Controller('deliveries')
export class DeliveriesController {
  constructor(private readonly deliveriesService: DeliveriesService) { }

  @Post()
  @ApiResponse({ status: 201, description: 'Entrega criada com sucesso' })
  async create(@Body() createDeliveryDto: CreateDeliveryDto, @Req() req) {
    const condominiumId = req.user.condominiumId;
    const data = await this.deliveriesService.create(createDeliveryDto, condominiumId);
    return buildResponse(201, 'Entrega criada com sucesso', data);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'Lista de entregas retornada com sucesso' })
  async findAll() {
    const data = await this.deliveriesService.findAll();
    return buildResponse(200, 'Lista de entregas retornada com sucesso', data);
  }

  @Get('filter')
  @ApiResponse({ status: 200, description: 'Lista de entregas retornada com sucesso' })
  async findByStatus(@Req() req, @Query('status') status: string) {
    const condominiumId = req.user.condominiumId;
    const deliveries = await this.deliveriesService.findByStatus(status, condominiumId);
    return buildResponse(200, `Lista de entregas com status ${status} retornadas com sucesso`, deliveries);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Entrega encontrada' })
  async findOne(@Param('id') id: string) {
    const data = await this.deliveriesService.findOne(id);
    return buildResponse(200, 'Entrega encontrada', data);
  }

  @Patch(':id')
  @ApiResponse({ status: 200, description: 'Entrega atualizada com sucesso' })
  async update(@Param('id') id: string, @Body() updateDeliveryDto: UpdateDeliveryDto) {
    const data = await this.deliveriesService.update(id, updateDeliveryDto);
    return buildResponse(200, 'Entrega atualizada com sucesso', data);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Entrega removida com sucesso' })
  async remove(@Param('id') id: string) {
    const data = await this.deliveriesService.remove(id);
    return buildResponse(200, 'Entrega removida com sucesso', data);
  }
}
