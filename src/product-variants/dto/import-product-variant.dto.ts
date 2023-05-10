import { ApiProperty } from '@nestjs/swagger';
import { SOURCE_CODE } from 'src/utils/constants';

export class ImportProductVariantDTO {
  @ApiProperty({ example: '2206125', description: 'Артикул товара' })
  article: string;

  @ApiProperty({ example: '25 A', description: 'Название варианта товара' })
  readonly title: string;

  @ApiProperty({ example: 6926, description: 'Стоимость варианта товара' })
  readonly price: number;

  @ApiProperty({
    example: '/images/123.jpg',
    description: 'Ссылка на изображение',
  })
  readonly image: string | null;

  @ApiProperty({
    example: 'Some string...',
    description: 'Описание товара',
  })
  readonly description: string | null;

  @ApiProperty({ example: 15, description: 'Количество товара на складе' })
  readonly count: number | null;

  @ApiProperty({ example: 1, description: 'ID товара' })
  readonly productId: number;

  @ApiProperty({
    example: '1',
    description: 'Внешний ключ интегрируемых сервисов',
  })
  readonly externalId: string;

  @ApiProperty({
    example: '1',
    description: 'Код источника',
  })
  readonly source: SOURCE_CODE;
}
