import type { RouteType } from '@types';
import { StoreAdminModule } from './store_admin.module';
import { ProductsModule } from './catalog/products/products.module';
import { AttributesModule } from './catalog/attributes/attributes.module';
import { AttributeValuesModule } from './catalog/attribute-values/attribute-values.module';
import { SuppliersModule } from './catalog/suppliers/suppliers.module';

export const STORE_ADMIN_ROUTES: RouteType = [
  {
    path: 'storeadmin',
    module: StoreAdminModule,
    children: [
      {
        path: 'products',
        module: ProductsModule,
      },
      {
        path: 'attributes',
        module: AttributesModule,
      },
      {
        path: 'attribute-values',
        module: AttributeValuesModule,
      },
      {
        path: 'suppliers',
        module: SuppliersModule,
      },
    ],
  },
];
