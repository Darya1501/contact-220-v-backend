import { ProductVariantsModule } from './../product-variants/product-variants.module';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProductCategoryModule } from 'src/product-category/product-category.module';
import { ProductsModule } from 'src/products/products.module';
import { MoyskladService } from './moysklad.service';
import { FilesModule } from 'src/files/files.module';

@Module({
  providers: [MoyskladService],
  imports: [
    HttpModule,
    ProductCategoryModule,
    ProductsModule,
    ProductVariantsModule,
    FilesModule,
  ],
})
export class MoyskladModule {}
