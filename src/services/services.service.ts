import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateServiceDTO } from './dto/create-sevice.dto';
import { Service } from './sevices.model';

@Injectable()
export class ServicesService {
  constructor(@InjectModel(Service) private seviceRepository: typeof Service) {}

  async create(dto: CreateServiceDTO) {
    const sevice = await this.seviceRepository.create(dto);
    return sevice;
  }

  async getAll() {
    const sevices = await this.seviceRepository.findAll({
      include: { all: true },
    });
    return sevices;
  }
}
