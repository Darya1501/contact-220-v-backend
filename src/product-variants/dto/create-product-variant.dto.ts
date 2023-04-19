import { ApiProperty } from '@nestjs/swagger';

export class CreateProductVariantDTO {
  @ApiProperty({
    example: '2206125',
    description: 'Артикул товара',
  })
  article: string;

  @ApiProperty({
    example: '180 Вт/1,0 кв.м',
    description: 'Название варианта товара',
  })
  readonly title: string;

  @ApiProperty({ example: 6926, description: 'Стоимость варианта товара' })
  readonly price: number;

  @ApiProperty({
    example: '/images/123.jpg',
    description: 'Ссылка на изображение',
  })
  readonly image: string;

  @ApiProperty({ example: 1, description: 'ID товара' })
  readonly productId: number;
}
