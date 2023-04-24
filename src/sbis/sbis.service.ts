import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AxiosError } from 'axios';
import { catchError, firstValueFrom } from 'rxjs';
import { ProductCategoryService } from 'src/product-category/product-category.service';
import { ProductsService } from 'src/products/products.service';
import { NomenclatureItem } from './sbis.types';

@Injectable()
export class SbisService {
  constructor(
    private readonly httpService: HttpService,
    private productCategoryService: ProductCategoryService,
    private productsService: ProductsService,
  ) {}

  // @Cron('0 * * * * *')
  async getProducts() {
    const {
      data: { nomenclatures },
    } = await firstValueFrom(
      this.httpService
        .get<{ nomenclatures: NomenclatureItem[] }>(
          'https://api.sbis.ru/retail/nomenclature/list',
          {
            params: {
              pointId: 201,
              priceListId: 8,
            },
            headers: {
              'X-SBISAccessToken':
                'PjYOVB4UXlwSHB6dnNVDFWV3N1KHR3WzhmYjVRaFYyJEMqU3dkNkkvYzhTMmsvSXZGcyo5czY5eERkYlZNzIwMjMtMDQtMjEgMTM6MjE6NDMuMzU3ODgz',
            },
          },
        )
        .pipe(
          catchError((error: AxiosError) => {
            console.log('error: ', error);
            throw 'An error happened!';
          }),
        ),
    );
    const categories = [];
    const products = [];
    const variants = [];

    nomenclatures.forEach((element) => {
      if (!element.hierarchicalParent) {
        categories.push(element);
      } else if (!element.article) {
        products.push(element);
      } else {
        variants.push(element);
      }
    });

    categories.forEach(async (category) => {
      const currentCategory = await this.productCategoryService.import({
        title: category.name,
        externalId: category.description,
      });

      products.forEach(async (product) => {
        if (product.hierarchicalParent === category.hierarchicalId) {
          await this.productsService.import({
            title: product.name,
            categoryId: currentCategory.id,
            externalId: product.description,
          });
        }
      });
    });
  }
}
