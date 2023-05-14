import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SOURCE_CODE } from 'src/utils/constants';
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
      if (product.dataValues.price !== dto.price) product.price = dto.price;
      if (product.dataValues.image !== dto.image) product.image = dto.image;
      if (product.dataValues.count !== dto.count) product.count = dto.count;

      if (product.dataValues.description !== dto.description)
        product.description = dto.description;
      if (product.dataValues.productId !== dto.productId)
        product.productId = dto.productId;

      product.mustBeRemoved = false;

      product.save();
    }

    return product;
  }

  async markForDeletion(source: SOURCE_CODE) {
    await this.productVariantRepository.update(
      { mustBeRemoved: true },
      { where: { source } },
    );
  }

  async deleteRows() {
    await this.productVariantRepository.destroy({
      where: { mustBeRemoved: true },
    });
  }
}
