import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Table,
  Model,
  DataType,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { ProductVariant } from 'src/product-variants/product-variants.model';

interface ProductCharacteristicCreationAttrs {
  title: string;
  value: string;
}

@Table({ tableName: 'product_characteristics' })
export class ProductCharacteristic extends Model<
  ProductCharacteristic,
  ProductCharacteristicCreationAttrs
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
    example: 'Бренд',
    description: 'Название характеристики',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 'Green Box',
    description: 'Значение характеристики',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value: string;

  @ForeignKey(() => ProductVariant)
  @Column({ type: DataType.INTEGER })
  variantId: number;

  @BelongsTo(() => ProductVariant)
  productVariant: ProductVariant;
}
