import { Test, TestingModule } from '@nestjs/testing';
import { SalesItemsService } from './sales-items.service';

describe('SalesItemsService', () => {
  let service: SalesItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SalesItemsService],
    }).compile();

    service = module.get<SalesItemsService>(SalesItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
