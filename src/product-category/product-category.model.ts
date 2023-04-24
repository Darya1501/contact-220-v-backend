import { ApiProperty } from '@nestjs/swagger';
import { Column, Table, Model, DataType, HasMany } from 'sequelize-typescript';
import { Product } from 'src/products/products.model';

interface ProductCategoryCreationAttrs {
  title: string;
}

@Table({ tableName: 'product_categories' })
export class ProductCategory extends Model<
  ProductCategory,
  ProductCategoryCreationAttrs
> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Нагревательный кабель',
    description: 'Категория товара',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 1,
    description: 'Внешний ключ интегрируемых сервисов',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true,
  })
  externalId: string;

  @HasMany(() => Product)
  products: Product[];
}
