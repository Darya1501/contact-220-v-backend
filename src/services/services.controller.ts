import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateServiceDTO } from './dto/create-service.dto';
import { ServicesService } from './services.service';
import { Service } from './services.model';

@ApiTags('Услуги')
@Controller('services')
export class ServicesController {
  constructor(private servicesService: ServicesService) {}

  @ApiOperation({ summary: 'Создание услуги' })
  @ApiResponse({ status: 200, type: Service })
  @Post()
  create(@Body() dto: CreateServiceDTO) {
    return this.servicesService.create(dto);
  }

  @ApiOperation({ summary: 'Получение всех услуг' })
  @ApiResponse({ status: 200, type: [Service] })
  @Get()
  getAll() {
    return this.servicesService.getAll();
  }
}
