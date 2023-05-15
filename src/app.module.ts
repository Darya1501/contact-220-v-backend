import { ProductCategory } from './product-category/product-category.model';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './products/products.model';
import { ProductsModule } from './products/products.module';
import { ProductCharacteristicModule } from './product-characteristic/product-characteristic.module';
import { ProductCharacteristic } from './product-characteristic/product-characteristic.model';
import { ProductCategoryModule } from './product-category/product-category.module';
import { ServiceCategoryModule } from './service-category/service-category.module';
import { ServiceCategory } from './service-category/service-category.model';
import { ServicesModule } from './services/services.module';
import { Service } from './services/services.model';
import { ProductVariantsModule } from './product-variants/product-variants.module';
import { ProductVariant } from './product-variants/product-variants.model';
import { ScheduleModule } from '@nestjs/schedule';
import { MoyskladModule } from './moysklad/moysklad.module';
import { FilesModule } from './files/files.module';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ScheduleModule.forRoot(),
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
      models: [
        Product,
        ProductCharacteristic,
        ProductVariant,
        ProductCategory,
        Service,
        ServiceCategory,
      ],
      autoLoadModels: true,
      // sync: { force: true },
    }),
    ProductsModule,
    ProductCharacteristicModule,
    ProductCategoryModule,
    ServiceCategoryModule,
    ServicesModule,
    ProductVariantsModule,
    MoyskladModule,
    FilesModule,
  ],
})
export class AppModule {}
