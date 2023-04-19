import { CreateProductDTO } from './dto/create-product.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Product } from './products.model';

@ApiTags('Товары')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Создание товара' })
  @ApiResponse({ status: 200, type: Product })
  @Post()
  create(@Body() productDRO: CreateProductDTO) {
    return this.productsService.createProduct(productDRO);
  }

  @ApiOperation({ summary: 'Получение всех пользователей' })
  @ApiResponse({ status: 200, type: [Product] })
  @Get()
  getAll() {
    return this.productsService.getAllProducts();
  }
}
