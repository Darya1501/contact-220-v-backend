import { CreateProductVariantDTO } from './dto/create-product-variant.dto';
import { Body, Controller, Post } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductVariant } from './product-variants.model';

@ApiTags('Варианты товаров')
@Controller('product-variants')
export class ProductVariantsController {
  constructor(private productVariantsService: ProductVariantsService) {}

  @ApiOperation({ summary: 'Создание варианта товаров' })
  @ApiResponse({ status: 200, type: ProductVariant })
  @Post()
  create(@Body() dto: CreateProductVariantDTO) {
    return this.productVariantsService.create(dto);
  }
}
