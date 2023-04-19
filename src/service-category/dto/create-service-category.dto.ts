import { ApiProperty } from '@nestjs/swagger';

export class CreateServiceCategoryDTO {
  @ApiProperty({
    example: 'Прокладка кабеля',
    description: 'Название категории',
  })
  readonly title: string;
}
