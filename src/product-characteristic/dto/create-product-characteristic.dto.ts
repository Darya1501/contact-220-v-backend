import { ApiProperty } from '@nestjs/swagger';

export class CreateProductCharacteristicDTO {
  @ApiProperty({ example: 'Бренд', description: 'Название характеристики' })
  readonly title: string;

  @ApiProperty({ example: 'Green Box', description: 'Значение характеристики' })
  readonly value: string;

  @ApiProperty({ example: 1, description: 'ID товара' })
  readonly productId: number;
}
