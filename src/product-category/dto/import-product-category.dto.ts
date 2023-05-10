import { ApiProperty } from '@nestjs/swagger';
import { SOURCE_CODE } from 'src/utils/constants';

export class ImportProductCategoryDTO {
  @ApiProperty({
    example: 'Нагревательный кабель',
    description: 'Название категории',
  })
  readonly title: string;

  @ApiProperty({ example: 1, description: 'Id родительской категории' })
  readonly parentId: number | null;

  @ApiProperty({
    example: '1',
    description: 'Внешний ключ интегрируемых сервисов',
  })
  readonly externalId: string;

  @ApiProperty({ example: '1', description: 'Код источника' })
  readonly source: SOURCE_CODE;
}
