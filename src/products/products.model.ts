import { ProductCharacteristic } from './../product-characteristic/product-characteristic.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Table,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ProductCategory } from 'src/product-category/product-category.model';

interface ProductCreationAttrs {
  title: string;
}

@Table({ tableName: 'products' })
export class Product extends Model<Product, ProductCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Нагревательный кабель "Green Box"',
    description: 'Название товара',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ForeignKey(() => ProductCategory)
  @Column({ type: DataType.INTEGER })
  categoryId: number;

  @HasMany(() => ProductCharacteristic)
  characteristics: ProductCharacteristic[];

  @BelongsTo(() => ProductCategory)
  category: ProductCategory;
}
