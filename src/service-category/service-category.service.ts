import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateServiceCategoryDTO } from './dto/create-service-category.dto';
import { ServiceCategory } from './service-category.model';

@Injectable()
export class ServiceCategoryService {
  constructor(
    @InjectModel(ServiceCategory)
    private serviceCategoryRepositiry: typeof ServiceCategory,
  ) {}

  async create(dto: CreateServiceCategoryDTO) {
    const category = await this.serviceCategoryRepositiry.create(dto);
    return category;
  }

  async getAll() {
    const categories = await this.serviceCategoryRepositiry.findAll({
      include: { all: true },
    });
    return categories;
  }
}
