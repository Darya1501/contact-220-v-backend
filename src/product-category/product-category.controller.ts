import { ProductCategory } from './product-category.model';
import { CreateProductCategoryDTO } from './dto/create-product-category.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductCategoryService } from './product-category.service';

@ApiTags('Категории товаров')
@Controller('product-category')
export class ProductCategoryController {
  constructor(private productCategoryService: ProductCategoryService) {}

  @ApiOperation({ summary: 'Создание категории товаров' })
  @ApiResponse({ status: 200, type: ProductCategory })
  @Post()
  create(@Body() dto: CreateProductCategoryDTO) {
    return this.productCategoryService.create(dto);
  }

  @ApiOperation({ summary: 'Получение всех категорий товаров' })
  @ApiResponse({ status: 200, type: [ProductCategory] })
  @Get()
  getAll() {
    return this.productCategoryService.getAll();
  }
}
