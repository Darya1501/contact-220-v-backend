import { ApiProperty } from '@nestjs/swagger';

export class CreateProductCategoryDTO {
  @ApiProperty({
    example: 'Нагревательный кабель',
    description: 'Название категории',
  })
  readonly title: string;
}
