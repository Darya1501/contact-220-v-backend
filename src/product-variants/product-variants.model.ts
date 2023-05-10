import { Product } from 'src/products/products.model';
import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { ProductCharacteristic } from 'src/product-characteristic/product-characteristic.model';
import { SOURCE_CODE } from 'src/utils/constants';

interface ProductVariantCreationAttrs {
  title: string;
}

@Table({ tableName: 'product_variants' })
export class ProductVariant extends Model<
  ProductVariant,
  ProductVariantCreationAttrs
> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '2206125', description: 'Артикул товара' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  article: string;

  @ApiProperty({ example: '25 A', description: 'Название варианта товара' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({ example: 6926, description: 'Стоимость варианта товара' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @ApiProperty({
    example: '/images/123.jpg',
    description: 'Ссылка на изображение',
  })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ApiProperty({ example: 'Some string...', description: 'Описание товара' })
  @Column({
    type: DataType.STRING(4096),
  })
  description: string;

  @ApiProperty({ example: 15, description: 'Количество товара на складе' })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  count: number;

  @ApiProperty({
    example: 1,
    description: 'Внешний ключ интегрируемых сервисов',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
  })
  externalId: string;

  @ApiProperty({ example: 1, description: 'ID товара' })
  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER })
  productId: number;

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

  @HasMany(() => ProductCharacteristic)
  characteristics: ProductCharacteristic[];

  @BelongsTo(() => Product)
  product: Product;
}
