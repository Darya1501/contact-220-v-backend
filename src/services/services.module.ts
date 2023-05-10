import { Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesController } from './services.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Service } from './services.model';

@Module({
  providers: [ServicesService],
  controllers: [ServicesController],
  imports: [SequelizeModule.forFeature([Service])],
})
export class ServicesModule {}
