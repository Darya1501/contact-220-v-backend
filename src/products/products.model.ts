import { ProductCharacteristic } from './../product-characteristic/product-characteristic.model';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Table, Model, DataType, HasMany } from 'sequelize-typescript';

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

  @HasMany(() => ProductCharacteristic)
  characteristics: ProductCharacteristic[];
}
