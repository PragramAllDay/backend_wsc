import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { SuperAdminModule } from 'src/super_admin/super_admin.module';

import { SUPERADMIN_ROUTES } from 'src/super_admin/super-admin.routes';
import { StoreAdminModule } from 'src/store_admin/store_admin.module';
import { STORE_ADMIN_ROUTES } from 'src/store_admin/store_admin.routes';

const ROUTES = [...SUPERADMIN_ROUTES, ...STORE_ADMIN_ROUTES];

@Module({
  imports: [SuperAdminModule, StoreAdminModule, RouterModule.register(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
