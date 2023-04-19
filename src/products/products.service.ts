import { CreateProductDTO } from './dto/create-product.dto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product) private productRepository: typeof Product,
  ) {}

  async createProduct(dto: CreateProductDTO) {
    const product = await this.productRepository.create(dto);
    return product;
  }

  async getAllProducts() {
    const products = await this.productRepository.findAll();
    return products;
  }
}
