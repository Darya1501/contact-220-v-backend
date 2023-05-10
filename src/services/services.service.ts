import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateServiceDTO } from './dto/create-service.dto';
import { Service } from './services.model';

@Injectable()
export class ServicesService {
  constructor(
    @InjectModel(Service) private serviceRepository: typeof Service,
  ) {}

  async create(dto: CreateServiceDTO) {
    const service = await this.serviceRepository.create(dto);
    return service;
  }

  async getAll() {
    const services = await this.serviceRepository.findAll({
      include: { all: true },
    });
    return services;
  }
}
