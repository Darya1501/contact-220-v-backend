import { ApiProperty } from '@nestjs/swagger';
import { Column, Table, Model, DataType, HasMany } from 'sequelize-typescript';
import { Service } from 'src/services/services.model';

interface ServiceCategoryCreationAttrs {
  title: string;
}

@Table({ tableName: 'service_categories' })
export class ServiceCategory extends Model<
  ServiceCategory,
  ServiceCategoryCreationAttrs
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
    example: 'Прокладка кабеля',
    description: 'Категория услуг',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  title: string;

  @HasMany(() => Service)
  services: Service[];
}
