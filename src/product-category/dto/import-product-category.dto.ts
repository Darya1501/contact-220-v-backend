import { ApiProperty } from '@nestjs/swagger';

export class ImportProductCategoryDTO {
  @ApiProperty({
    example: 'Нагревательный кабель',
    description: 'Название категории',
  })
  readonly title: string;

  @ApiProperty({
    example: '1',
    description: 'Внешний ключ интегрируемых сервисов',
  })
  readonly externalId: string;
}
