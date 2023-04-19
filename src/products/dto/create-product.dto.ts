import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDTO {
  @ApiProperty({
    example: 'Нагревательный кабель "Green Box"',
    description: 'Название товара',
  })
  readonly title: string;
}
