import { ServiceCategory } from './service-category.model';
import { Module } from '@nestjs/common';
import { ServiceCategoryService } from './service-category.service';
import { ServiceCategoryController } from './service-category.controller';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [ServiceCategoryService],
  controllers: [ServiceCategoryController],
  imports: [SequelizeModule.forFeature([ServiceCategory])],
})
export class ServiceCategoryModule {}
