import { Test, TestingModule } from '@nestjs/testing';
import { SalesItemsController } from './sales-items.controller';

describe('SalesItemsController', () => {
  let controller: SalesItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SalesItemsController],
    }).compile();

    controller = module.get<SalesItemsController>(SalesItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
