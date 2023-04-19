import { Test, TestingModule } from '@nestjs/testing';
import { ProductCharacteristicService } from './product-characteristic.service';

describe('ProductCharacteristicService', () => {
  let service: ProductCharacteristicService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductCharacteristicService],
    }).compile();

    service = module.get<ProductCharacteristicService>(ProductCharacteristicService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
