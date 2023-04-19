import { Module } from '@nestjs/common';
import { ProductCharacteristicService } from './product-characteristic.service';
import { ProductCharacteristicController } from './product-characteristic.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductCharacteristic } from './product-characteristic.model';

@Module({
  providers: [ProductCharacteristicService],
  controllers: [ProductCharacteristicController],
  imports: [SequelizeModule.forFeature([ProductCharacteristic])],
})
export class ProductCharacteristicModule {}
