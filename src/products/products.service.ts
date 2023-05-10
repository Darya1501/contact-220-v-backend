import { CreateProductDTO } from './dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';
import { ImportProductDTO } from './dto/import-product.dto';

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

  async import(dto: ImportProductDTO) {
    console.log('dto: ', dto);
    const [product, created] = await this.productRepository.findOrCreate({
      where: { externalId: dto.externalId },
      defaults: dto,
    });

    console.log('created: ', created);

    // if (!created) {
    //   if (product.dataValues.title !== dto.title) product.title = dto.title;
    //   if (product.dataValues.categoryId !== dto.categoryId)
    //     product.categoryId = dto.categoryId;
    //   product.save();
    // }

    return product;
  }
}
