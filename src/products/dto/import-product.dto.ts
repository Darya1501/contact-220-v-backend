import { ApiProperty } from '@nestjs/swagger';

export class ImportProductDTO {
  @ApiProperty({
    example: 'Нагревательный кабель "Green Box"',
    description: 'Название товара',
  })
  readonly title: string;

  @ApiProperty({ example: 1, description: 'ID категории' })
  readonly categoryId: number;

  @ApiProperty({
    example: '1',
    description: 'Внешний ключ интегрируемых сервисов',
  })
  readonly externalId: string;
}
