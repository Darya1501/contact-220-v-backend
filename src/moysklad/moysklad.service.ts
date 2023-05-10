import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { sleep } from 'src/functions/sleep';
import { ProductCategoryService } from 'src/product-category/product-category.service';
import { ProductsService } from 'src/products/products.service';
import { MoyskladFolder, NomenclatureItem } from './moysklad.types';

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
      });
      return product.id;
    }

    if (parent && parent !== 'a7147161-e5bc-11ed-0a80-0f53000eb73f') {
      const parentId = await this.getFolder(parent, false);
      const category = await this.productCategoryService.import({
        title,
        externalId: id,
        parentId,
      });
      return category.id;
    } else {
      const category = await this.productCategoryService.import({
        title,
        externalId: id,
        parentId: null,
      });
      return category.id;
    }
  }

  @Cron('55 * * * * *')
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
    const categories = [];

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

    // console.log('variants: ', variants);

    // const categories = [];

    // rows.forEach(async (row) => {
    //   const pathData = row.pathName.split('/');
    //   pathData.shift();
    //   const currentProductName = pathData.pop();

    //   let lastCategoryId: number | null = null;

    //   pathData.forEach(async (data) => {
    //     if (!categories.find((category) => category === data)) {
    //       const currentCategory = await this.productCategoryService.import({
    //         title: data,
    //         externalId: '',
    //         parentId: lastCategoryId,
    //       });
    //       lastCategoryId = currentCategory.id;
    //       categories.push(currentProductName);
    //     }
    //   });

    //   const currentVariant = row.name.replace(currentProductName, '');
    // });
    // const categories = [];
    // const products = [];
    // const variants = [];

    // nomenclatures.forEach((element) => {
    //   if (!element.hierarchicalParent) {
    //     categories.push(element);
    //   } else if (!element.article) {
    //     products.push(element);
    //   } else {
    //     variants.push(element);
    //   }
    // });

    //   categories.forEach(async (category) => {
    //     const currentCategory = await this.productCategoryService.import({
    //       title: category.name,
    //       externalId: category.description,
    //     });

    //     products.forEach(async (product) => {
    //       if (product.hierarchicalParent === category.hierarchicalId) {
    //         await this.productsService.import({
    //           title: product.name,
    //           categoryId: currentCategory.id,
    //           externalId: product.description,
    //         });
    //       }
    //     });
    //   });
  }
}
