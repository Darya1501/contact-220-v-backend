import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ProductCategoryModule } from 'src/product-category/product-category.module';
import { ProductsModule } from 'src/products/products.module';
import { SbisService } from './sbis.service';

@Module({
  providers: [SbisService],
  imports: [HttpModule, ProductCategoryModule, ProductsModule],
})
export class SbisModule {}
