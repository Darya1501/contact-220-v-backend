import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductVariantDTO } from './dto/create-product-variant.dto';
import { ImportProductVariantDTO } from './dto/import-product-variant.dto';
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

  async import(dto: ImportProductVariantDTO) {
    const [product, created] = await this.productVariantRepository.findOrCreate(
      {
        where: { externalId: dto.externalId },
        defaults: dto,
      },
    );

    if (!created) {
      if (product.dataValues.title !== dto.title) product.title = dto.title;
      // if (product.dataValues.categoryId !== dto.categoryId)
      //   product.categoryId = dto.categoryId;
      product.save();
    }

    return product;
  }
}
