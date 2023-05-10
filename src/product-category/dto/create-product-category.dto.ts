import { ApiProperty } from '@nestjs/swagger';

export class CreateProductCategoryDTO {
  @ApiProperty({
    example: 'Нагревательный кабель',
    description: 'Название категории',
  })
  readonly title: string;

  @ApiProperty({ example: 1, description: 'ID родительской категории' })
  readonly parentId: number | null;
}
