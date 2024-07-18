import { Module } from '@nestjs/common';

import { StoreOwnerController } from './store_owner.controller';
import { StoreOwnerService } from './store_owner.service';

@Module({
  controllers: [StoreOwnerController],
  providers: [StoreOwnerService],
})
export class StoreOwnerModule {}
