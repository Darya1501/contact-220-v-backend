import { CreateProductVariantDTO } from './dto/create-product-variant.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Варианты товаров')
@Controller('product-variants')
export class ProductVariantsController {
  constructor(private productVariantsService: ProductVariantsService) {}

  @ApiOperation({ summary: 'Создание варианта товаров' })
  @Post()
  create(@Body() dto: CreateProductVariantDTO) {
    return this.productVariantsService.create(dto);
  }
}
