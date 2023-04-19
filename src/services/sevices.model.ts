import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Table,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { ServiceCategory } from 'src/service-category/service-category.model';

interface ServiceCreationAttrs {
  title: string;
}

@Table({ tableName: 'services' })
export class Service extends Model<Service, ServiceCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Прокладка кабеля сечением до 2,5 мм²',
    description: 'Название услуги',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @ApiProperty({
    example: 40,
    description: 'Стоимость услуги',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  price: number;

  @ApiProperty({
    example: 'м.п.',
    description: 'Единицы измерения',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  unit: string;

  @ForeignKey(() => ServiceCategory)
  @Column({ type: DataType.INTEGER })
  categoryId: number;

  @BelongsTo(() => ServiceCategory)
  category: ServiceCategory;
}
