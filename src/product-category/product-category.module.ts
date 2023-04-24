import { Module } from '@nestjs/common';
import { ProductCategoryService } from './product-category.service';
import { ProductCategoryController } from './product-category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductCategory } from './product-category.model';

@Module({
  providers: [ProductCategoryService],
  controllers: [ProductCategoryController],
  imports: [SequelizeModule.forFeature([ProductCategory])],
  exports: [ProductCategoryService],
})
export class ProductCategoryModule {}
