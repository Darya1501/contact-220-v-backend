import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty({
    example: 'Нагревательный кабель "Green Box"',
    description: 'Название товара',
  })
  readonly title: string;

  @ApiProperty({ example: 1, description: 'ID категории' })
  readonly categoryId: number;
}
