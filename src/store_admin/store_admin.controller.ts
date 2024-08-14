import { Controller, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequirePermisison } from 'src/auth/decorators';
import { ActiveGuard, JwtGuard, RolesGuard } from 'src/auth/guards';
import { Role } from 'src/auth/enums/role.enum';

@ApiTags('Store Admin')
@Controller()
@ApiBearerAuth('authorization')
@UseGuards(JwtGuard, ActiveGuard, RolesGuard)
@RequirePermisison(Role.STORE_OWNER)
@Controller('store-admin')
export class StoreAdminController {
  constructor() {}
}
