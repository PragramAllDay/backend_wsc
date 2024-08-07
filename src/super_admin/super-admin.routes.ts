import { SuperAdminModule } from './super_admin.module';

import type { RouteType } from '@types';

import { MeMdodule as SuperAdminMeModule } from './me/me.module';
import { CountryModule as SuperAdminCountryModule } from './country/country.module';
import { StateModule as SuperAdminStateMoudle } from './state/state.module';
import { CityModule as SuperAdminCityModule } from './city/city.module';

import { StoreOwnerModule as SuperAdminStoreOwnerModule } from './store_owner/store_owner.module';

import { StoreModule as SuperAdminStoreModule } from './store/store.module';
import { CategoryModule } from './category/category.module';

export const SUPERADMIN_ROUTES: RouteType = [
  {
    path: 'superadmin',
    module: SuperAdminModule,
    children: [
      {
        path: 'me',
        module: SuperAdminMeModule,
      },
      {
        path: 'countries',
        module: SuperAdminCountryModule,
      },
      {
        path: 'states',
        module: SuperAdminStateMoudle,
      },
      {
        path: 'cities',
        module: SuperAdminCityModule,
      },
      {
        path: 'store-owners',
        module: SuperAdminStoreOwnerModule,
      },
      {
        path: 'stores',
        module: SuperAdminStoreModule,
      },
      {
        path: 'categories',
        module: CategoryModule,
      },
    ],
  },
];
