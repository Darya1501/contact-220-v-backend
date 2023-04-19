import { CreateProductCharacteristicDTO } from './dto/create-product-characteristic.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ProductCharacteristic } from './product-characteristic.model';

@Injectable()
export class ProductCharacteristicService {
  constructor(
    @InjectModel(ProductCharacteristic)
    private productCharacteristicRepository: typeof ProductCharacteristic,
  ) {}

  async create(dto: CreateProductCharacteristicDTO) {
    const characteristic = await this.productCharacteristicRepository.create(
      dto,
    );
    return characteristic;
  }
}
