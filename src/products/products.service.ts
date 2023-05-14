import { CreateProductDTO } from './dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';
import { ImportProductDTO } from './dto/import-product.dto';
import { SOURCE_CODE } from 'src/utils/constants';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
  ) {}

  async createProduct(dto: CreateProductDTO) {
    const product = await this.productRepository.create(dto);
    return product;
  }

  async getAllProducts() {
    const products = await this.productRepository.findAll({
      include: { all: true },
    });
    return products;
  }

  async findByExternalId(externalId: string) {
    const product = await this.productRepository.findOne({
      where: { externalId },
    });
    return product.id;
  }

  async import(dto: ImportProductDTO) {
    const [product, created] = await this.productRepository.findOrCreate({
      where: { externalId: dto.externalId },
      defaults: dto,
    });

    if (!created) {
      if (product.dataValues.title !== dto.title) product.title = dto.title;
      if (product.dataValues.categoryId !== dto.categoryId)
        product.categoryId = dto.categoryId;

      product.mustBeRemoved = false;

      product.save();
    }

    return product;
  }

  async markForDeletion(source: SOURCE_CODE) {
    await this.productRepository.update(
      { mustBeRemoved: true },
      { where: { source } },
    );
  }

  async deleteRows() {
    await this.productRepository.destroy({
      where: { mustBeRemoved: true },
    });
  }
}
