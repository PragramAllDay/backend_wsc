import { Module } from '@nestjs/common';
import { StoreAdminController } from './store_admin.controller';
import { ProductsModule } from './catalog/products/products.module';
import { AttributesModule } from './catalog/attributes/attributes.module';
import { AttributeValuesModule } from './catalog/attribute-values/attribute-values.module';

@Module({
  imports: [StoreAdminModule, AttributesModule, AttributeValuesModule],
  controllers: [StoreAdminController],
})
export class StoreAdminModule {}
