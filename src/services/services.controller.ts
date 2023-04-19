import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateServiceDTO } from './dto/create-sevice.dto';
import { ServicesService } from './services.service';
import { Service } from './sevices.model';

@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @ApiOperation({ summary: 'Создание товара' })
  @ApiResponse({ status: 200, type: Service })
  @Post()
  create(@Body() dto: CreateServiceDTO) {
    return this.servicesService.create(dto);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [Service] })
  @Get()
  getAll() {
    return this.servicesService.getAll();
  }
}
