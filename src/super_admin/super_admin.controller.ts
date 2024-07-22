import { Controller, UseGuards } from '@nestjs/common';

import { JwtGuard, ActiveGuard, RolesGuard } from 'src/auth/guards';
import { RequirePermisison } from 'src/auth/decorators';
import { Role } from 'src/auth/enums/role.enum';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
@ApiTags('Super Admin')
@Controller()
@ApiBearerAuth('authorization')
@UseGuards(JwtGuard, ActiveGuard, RolesGuard)
@RequirePermisison(Role.SUPERADMIN)
export class SuperAdminController {
  constructor() {}
}
