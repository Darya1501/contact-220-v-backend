import { Test, TestingModule } from '@nestjs/testing';
import { ProductCharacteristicController } from './product-characteristic.controller';

describe('ProductCharacteristicController', () => {
  let controller: ProductCharacteristicController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductCharacteristicController],
    }).compile();

    controller = module.get<ProductCharacteristicController>(ProductCharacteristicController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
