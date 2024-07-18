import { Module } from '@nestjs/common';

import { SuperAdminController } from './super_admin.controller';

import { MeMdodule as SuperAdminMeModule } from './me/me.module';
import { CountryModule as SuperAdminCountryModule } from './country/country.module';
import { StateModule as SuperAdminStateModule } from './state/state.module';
import { CityModule as SuperAdminCityModule } from './city/city.module';

import { StoreOwnerModule as SuperAdminStoreOwnerModule } from './store_owner/store_owner.module';

import { StoreModule as SuperAdminStoreModule } from './store/store.module';

@Module({
  imports: [
    SuperAdminMeModule,
    SuperAdminCountryModule,
    SuperAdminStateModule,
    SuperAdminCityModule,
    SuperAdminStoreOwnerModule,
    SuperAdminStoreModule,
  ],
  controllers: [SuperAdminController],
})
export class SuperAdminModule {}
