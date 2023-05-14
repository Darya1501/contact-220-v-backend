import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { ProductVariantsController } from './product-variants.controller';
import { ProductVariant } from './product-variants.model';

@Module({
  providers: [ProductVariantsService],
  controllers: [ProductVariantsController],
  imports: [SequelizeModule.forFeature([ProductVariant])],
  exports: [ProductVariantsService],
})
export class ProductVariantsModule {}
