import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { sleep } from 'src/utils/functions';
import { ProductCategoryService } from 'src/product-category/product-category.service';
import { ProductsService } from 'src/products/products.service';
import { MoyskladFolder, NomenclatureItem } from './moysklad.types';
import { SOURCE_CODE } from 'src/utils/constants';

@Injectable()
export class MoyskladService {
  constructor(
    private readonly httpService: HttpService,
    private productCategoryService: ProductCategoryService,
    private productsService: ProductsService,
  ) {}

  async getFolder(id: string, isProduct: boolean) {
    const { data } = await firstValueFrom(
      this.httpService
        .get<MoyskladFolder>(
          `https://online.moysklad.ru/api/remap/1.2/entity/productfolder/${id}`,
          {
            headers: {
              Authorization: `Basic ${Buffer.from(
                `${process.env.MOYSKLAD_LOGIN}:${process.env.MOYSKLAD_PASSWORD}`,
              ).toString('base64')}`,
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

    const title = data.name;
    const parent = data.productFolder
      ? data.productFolder.meta.href.split('/').reverse()[0]
      : null;

    if (isProduct) {
      const parentId = await this.getFolder(parent, false);
      const product = await this.productsService.import({
        title,
        externalId: id,
        categoryId: parentId,
        source: SOURCE_CODE.MOYSKLAD,
      });
      return product.id;
    }

    if (parent && parent !== 'a7147161-e5bc-11ed-0a80-0f53000eb73f') {
      const parentId = await this.getFolder(parent, false);
      const category = await this.productCategoryService.import({
        title,
        externalId: id,
        parentId,
        source: SOURCE_CODE.MOYSKLAD,
      });
      return category.id;
    } else {
      const category = await this.productCategoryService.import({
        title,
        externalId: id,
        parentId: null,
        source: SOURCE_CODE.MOYSKLAD,
      });
      return category.id;
    }
  }

  // @Cron('55 * * * * *')
  async getAssortment() {
    console.log('cron working');
    const {
      data: { rows },
    } = await firstValueFrom(
      this.httpService
        .get<{ rows: NomenclatureItem[] }>(
          'https://online.moysklad.ru/api/remap/1.2/entity/assortment?filter=pathname~=Магазин/Теплые полы/Нагревательные кабели',
          {
            headers: {
              Authorization: `Basic ${Buffer.from(
                `${process.env.MOYSKLAD_LOGIN}:${process.env.MOYSKLAD_PASSWORD}`,
              ).toString('base64')}`,
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

    const variants = [];
    const products = [];

    rows.forEach(async (element: NomenclatureItem) => {
      variants.push(element.name);
      const productId = element.productFolder.meta.href.split('/').reverse()[0];

      if (!products.find((product) => product === productId)) {
        products.push(productId);
        const createdProductId = await this.getFolder(productId, true);
        console.log('createdProductId: ', createdProductId);
      }

      await sleep(1000);
    });
  }
}
