import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

import { SuperAdminModule } from 'src/super_admin/super_admin.module';

import { SUPERADMIN_ROUTES } from 'src/super_admin/super-admin.routes';

const ROUTES = [...SUPERADMIN_ROUTES];

@Module({
  imports: [SuperAdminModule, RouterModule.register(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
