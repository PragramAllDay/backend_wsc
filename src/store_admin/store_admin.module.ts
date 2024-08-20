import { Module } from '@nestjs/common';
import { StoreAdminController } from './store_admin.controller';
import { ProductsModule } from './catalog/products/products.module';
import { AttributesModule } from './catalog/attributes/attributes.module';
import { AttributeValuesModule } from './catalog/attribute-values/attribute-values.module';
import { SuppliersModule } from './catalog/suppliers/suppliers.module';

@Module({
  imports: [
    StoreAdminModule,
    ProductsModule,
    AttributesModule,
    AttributeValuesModule,
    SuppliersModule,
  ],
  controllers: [StoreAdminController],
})
export class StoreAdminModule {}
