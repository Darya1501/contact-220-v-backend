import { ProductVariantsService } from './../product-variants/product-variants.service';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { AxiosError } from 'axios';
import { firstValueFrom, catchError } from 'rxjs';
import { ProductCategoryService } from 'src/product-category/product-category.service';
import { ProductsService } from 'src/products/products.service';
import {
  MoyskladFolder,
  MoyskladImage,
  NomenclatureItem,
} from './moysklad.types';
import { SOURCE_CODE } from 'src/utils/constants';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class MoyskladService {
  constructor(
    private readonly httpService: HttpService,
    private productCategoryService: ProductCategoryService,
    private productsService: ProductsService,
    private productVariantsService: ProductVariantsService,
    private filesService: FilesService,
  ) {}

  makeRequests(urls, limit, delay) {
    let index = 0;
    const intervalId = setInterval(async () => {
      if (index >= urls.length) {
        clearInterval(intervalId);
        return;
      }

      const {
        data: { rows },
      } = await firstValueFrom(
        this.httpService
          .get<{ rows: MoyskladImage[] }>(urls[index], {
            headers: {
              Authorization: `Basic ${Buffer.from(
                `${process.env.MOYSKLAD_LOGIN}:${process.env.MOYSKLAD_PASSWORD}`,
              ).toString('base64')}`,
            },
          })
          .pipe(
            catchError((error: AxiosError) => {
              console.log('error: ', error);
              throw 'An error happened!';
            }),
          ),
      );

      if (rows.length) {
        const downloadHref = rows[0].meta.downloadHref;
        const imageId = downloadHref.split('/').reverse()[0];
        const fileName = rows[0].filename;
        const productId = rows[0].meta.href.split('/').reverse()[2];
        this.productVariantsService.addImage({
          downloadHref,
          imageId,
          fileName,
          productId,
        });
      }

      index++;
    }, delay);

    setTimeout(() => {
      clearInterval(intervalId);
    }, limit * delay);
  }

  async getFolder(id: string, isProduct: boolean, folders: MoyskladFolder[]) {
    const folder = folders.find((folder) => folder.id === id);

    const title = folder.name;
    const parent = folder.productFolder
      ? folder.productFolder.meta.href.split('/').reverse()[0]
      : null;

    if (isProduct) {
      const parentId = await this.getFolder(parent, false, folders);
      const product = await this.productsService.import({
        title,
        externalId: id,
        categoryId: parentId,
        source: SOURCE_CODE.MOYSKLAD,
      });
      return product.id;
    }

    if (parent && parent !== 'a7147161-e5bc-11ed-0a80-0f53000eb73f') {
      const parentId = await this.getFolder(parent, false, folders);
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

  async delete() {
    await this.productVariantsService.deleteRows();
    await this.productsService.deleteRows();
    await this.productCategoryService.deleteRows();

    await this.productCategoryService.markForDeletion(SOURCE_CODE.MOYSKLAD);
    await this.productsService.markForDeletion(SOURCE_CODE.MOYSKLAD);
    await this.productVariantsService.markForDeletion(SOURCE_CODE.MOYSKLAD);
  }

  // @Cron('05 * * * * *')
  async getAssortment() {
    console.log('cron working');
    this.delete();

    const {
      data: { rows: folders },
    } = await firstValueFrom(
      this.httpService
        .get<{ rows: NomenclatureItem[] }>(
          'https://online.moysklad.ru/api/remap/1.2/entity/productfolder?filter=pathName~=Магазин',
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

    const {
      data: { rows: variants },
    } = await firstValueFrom(
      this.httpService
        .get<{ rows: NomenclatureItem[] }>(
          'https://online.moysklad.ru/api/remap/1.2/entity/assortment?filter=pathname~=Магазин/Теплые полы/Нагревательные кабели', // /Теплые полы/Нагревательные кабели
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

    const products = [];
    const productPromises = [];
    const imagesURLs = [];

    variants.forEach(async (element: NomenclatureItem) => {
      const productId = element.productFolder.meta.href.split('/').reverse()[0];

      if (!products.find((product) => product === productId)) {
        products.push(productId);
        productPromises.push(this.getFolder(productId, true, folders));
      }
      imagesURLs.push(element.images.meta.href);
    });

    Promise.all(productPromises)
      .then(() => {
        variants.forEach(async (element: NomenclatureItem) => {
          const productId = element.productFolder.meta.href
            .split('/')
            .reverse()[0];

          await this.productsService
            .findByExternalId(productId)
            .then(async (existingProductId) => {
              await this.productVariantsService.import({
                article: element.article,
                title: element.name,
                price: element.salePrices[0].value,
                description: element.description,
                count: element.quantity,
                productId: existingProductId,
                externalId: element.id,
                source: SOURCE_CODE.MOYSKLAD,
              });
            });
        });
      })
      .then(() => {
        this.makeRequests(imagesURLs, 15, 100);
      });
  }
}
