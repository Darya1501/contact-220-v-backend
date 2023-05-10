import { ProductCategory } from './product-category.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductCategoryDTO } from './dto/create-product-category.dto';
import { ImportProductCategoryDTO } from './dto/import-product-category.dto';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectModel(ProductCategory)
    private productCategoryRepository: typeof ProductCategory,
  ) {}

  async create(dto: CreateProductCategoryDTO) {
    const category = await this.productCategoryRepository.create(dto);
    return category;
  }

  async getAll() {
    const categories = await this.productCategoryRepository.findAll();
    return categories;
  }

  async import(dto: ImportProductCategoryDTO) {
    const [category, created] =
      await this.productCategoryRepository.findOrCreate({
        where: { externalId: dto.externalId },
        defaults: dto,
      });

    if (!created && category.dataValues.title !== dto.title) {
      category.title = dto.title;
      category.save();
    }

    return category;
  }
}
