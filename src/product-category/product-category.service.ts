import { ProductCategory } from './product-category.model';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateProductCategoryDTO } from './dto/create-product-category.dto';

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectModel(ProductCategory)
    private productCategoryRepositiry: typeof ProductCategory,
  ) {}

  async create(dto: CreateProductCategoryDTO) {
    const category = await this.productCategoryRepositiry.create(dto);
    return category;
  }

  async getAll() {
    const categories = await this.productCategoryRepositiry.findAll();
    return categories;
  }
}
