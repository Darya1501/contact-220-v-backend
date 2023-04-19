import { CreateProductDTO } from './dto/create-product.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  create(@Body() productDRO: CreateProductDTO) {
    return this.productsService.createProduct(productDRO);
  }

  @Get()
  getAll() {
    return this.productsService.getAllProducts();
  }
}
