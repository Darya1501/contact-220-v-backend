import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { firstValueFrom, catchError } from 'rxjs';
import { AxiosError } from 'axios';
import { FilesService } from 'src/files/files.service';
import { SOURCE_CODE } from 'src/utils/constants';
import { CreateProductVariantDTO } from './dto/create-product-variant.dto';
import { ImportProductVariantDTO } from './dto/import-product-variant.dto';
import { ProductVariant } from './product-variants.model';

@Injectable()
export class ProductVariantsService {
  constructor(
    @InjectModel(ProductVariant)
    private productVariantRepository: typeof ProductVariant,
    private readonly httpService: HttpService,
    private filesService: FilesService,
  ) {}

  async create(dto: CreateProductVariantDTO) {
    const variant = await this.productVariantRepository.create(dto);
    return variant;
  }

  async import(dto: ImportProductVariantDTO) {
    const [product, created] = await this.productVariantRepository.findOrCreate(
      {
        where: { externalId: dto.externalId },
        defaults: dto,
      },
    );

    if (!created) {
      if (product.dataValues.title !== dto.title) product.title = dto.title;
      if (product.dataValues.price !== dto.price) product.price = dto.price;
      if (product.dataValues.count !== dto.count) product.count = dto.count;

      if (product.dataValues.description !== dto.description)
        product.description = dto.description;
      if (product.dataValues.productId !== dto.productId)
        product.productId = dto.productId;

      product.mustBeRemoved = false;

      product.save();
    }

    return product;
  }

  async downloadImage(image: {
    downloadHref: string;
    imageId: string;
    fileName: string;
  }) {
    const { data } = await firstValueFrom(
      this.httpService
        .get(image.downloadHref, {
          headers: {
            Authorization: `Basic ${Buffer.from(
              `${process.env.MOYSKLAD_LOGIN}:${process.env.MOYSKLAD_PASSWORD}`,
            ).toString('base64')}`,
          },
          responseType: 'arraybuffer',
        })
        .pipe(
          catchError((error: AxiosError) => {
            console.log('error: ', error);
            throw 'An error happened!';
          }),
        ),
    );

    return await this.filesService.createFile(data, image);
  }

  async addImage(image: {
    downloadHref: string;
    imageId: string;
    fileName: string;
    productId: string;
  }) {
    const product = await this.productVariantRepository.findOne({
      where: { externalId: image.productId },
    });

    if (product && product.dataValues.externalImage !== image.imageId) {
      this.downloadImage(image).then((path) => {
        product.image = path;
        product.externalImage = image.imageId;
        product.save();
      });
    }
  }

  async markForDeletion(source: SOURCE_CODE) {
    await this.productVariantRepository.update(
      { mustBeRemoved: true },
      { where: { source } },
    );
  }

  async deleteRows() {
    await this.productVariantRepository.destroy({
      where: { mustBeRemoved: true },
    });
  }
}
