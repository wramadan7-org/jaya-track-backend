import { Injectable } from '@nestjs/common';

@Injectable()
export class InventoryService {
  getInventoryStatus(): string {
    return 'Inventory is up and running!';
  }
}
