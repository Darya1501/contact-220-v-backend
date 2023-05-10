import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceDTO {
  @ApiProperty({
    example: 'Нагревательный кабель "Green Box"',
    description: 'Название товара',
  })
  readonly title: string;

  @ApiProperty({
    example: 40,
    description: 'Стоимость услуги',
  })
  readonly price: number;

  @ApiProperty({
    example: 'м.п.',
    description: 'Единицы измерения',
  })
  readonly unit: string;

  @ApiProperty({ example: 1, description: 'ID категории' })
  readonly categoryId: number;
}
