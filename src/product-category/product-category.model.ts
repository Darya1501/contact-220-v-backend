import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Table,
  Model,
  DataType,
  HasMany,
  ForeignKey,
} from 'sequelize-typescript';
import { Product } from 'src/products/products.model';
import { SOURCE_CODE } from 'src/utils/constants';

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
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 1, description: 'ID родительской категории' })
  @Column({ type: DataType.INTEGER })
  @ForeignKey(() => ProductCategory)
  parentId: number | null;

  @ApiProperty({
    example: 1,
    description: 'Внешний ключ интегрируемых сервисов',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  externalId: string;

  @Column({
    type: DataType.INTEGER,
    defaultValue: SOURCE_CODE.INTERNAL,
  })
  source: SOURCE_CODE;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  mustBeRemoved: boolean;

  @HasMany(() => Product)
  products: Product[];
}
