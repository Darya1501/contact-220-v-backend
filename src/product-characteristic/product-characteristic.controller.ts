import { ProductCharacteristicService } from './product-characteristic.service';
import { Body, Controller, Post } from '@nestjs/common';
import { CreateProductCharacteristicDTO } from './dto/create-product-characteristic.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductCharacteristic } from './product-characteristic.model';

@ApiTags('Характеристики товаров')
@Controller('product-characteristic')
export class ProductCharacteristicController {
  constructor(
    private productCharacteristicService: ProductCharacteristicService,
  ) {}

  @ApiOperation({ summary: 'Создание характеристики товара' })
  @ApiResponse({ status: 200, type: ProductCharacteristic })
  @Post()
  createProductCharacteristic(@Body() dto: CreateProductCharacteristicDTO) {
    return this.productCharacteristicService.create(dto);
  }
}
