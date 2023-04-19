import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductVariantDTO } from './dto/create-product-variant.dto';
import { ProductVariant } from './product-variants.model';

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectModel(ProductVariant)
    private productVariantRepository: typeof ProductVariant,
  ) {}

  async create(dto: CreateProductVariantDTO) {
    const variant = await this.productVariantRepository.create(dto);
    return variant;
  }
}
