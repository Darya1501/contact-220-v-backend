import { ProductCategory } from './product-category/product-category.model';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products/products.model';
import { ProductsModule } from './products/products.module';
import { ProductCharacteristicModule } from './product-characteristic/product-characteristic.module';
import { ProductCharacteristic } from './product-characteristic/product-characteristic.model';
import { ProductCategoryModule } from './product-category/product-category.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Product, ProductCharacteristic, ProductCategory],
      autoLoadModels: true,
    }),
    ProductsModule,
    ProductCharacteristicModule,
    ProductCategoryModule,
  ],
})
export class AppModule {}
