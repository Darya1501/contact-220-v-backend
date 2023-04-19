import { ServiceCategory } from './service-category.model';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ServiceCategoryService } from './service-category.service';
import { CreateServiceCategoryDTO } from './dto/create-service-category.dto';

@ApiTags('Категории услуг')
@Controller('service-category')
export class ServiceCategoryController {
  constructor(private serviceCategoryService: ServiceCategoryService) {}

  @ApiOperation({ summary: 'Создание категории услуг' })
  @ApiResponse({ status: 200, type: ServiceCategory })
  @Post()
  create(@Body() dto: CreateServiceCategoryDTO) {
    return this.serviceCategoryService.create(dto);
  }

  @ApiOperation({ summary: 'Получение всех категорий услуг' })
  @ApiResponse({ status: 200, type: [ServiceCategory] })
  @Get()
  getAll() {
    return this.serviceCategoryService.getAll();
  }
}
