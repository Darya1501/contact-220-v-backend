import { SequelizeModule } from '@nestjs/sequelize';
import { Module } from '@nestjs/common';
import { ProductVariantsService } from './product-variants.service';
import { ProductVariantsController } from './product-variants.controller';
import { ProductVariant } from './product-variants.model';
import { HttpModule } from '@nestjs/axios';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [ProductVariantsService],
  controllers: [ProductVariantsController],
  imports: [
    HttpModule,
    FilesModule,
    SequelizeModule.forFeature([ProductVariant]),
  ],
  exports: [ProductVariantsService],
})
export class ProductVariantsModule {}
