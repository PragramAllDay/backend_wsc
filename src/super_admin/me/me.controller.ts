import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';

import { SuperAdminController } from '../super_admin.controller';

import { MeService } from './me.service';

import { GetUser } from 'src/auth/decorators';

import { UserRes } from '@types';

@Controller()
export class MeController extends SuperAdminController {
  constructor(private meService: MeService) {
    super();
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  public async getCurrent(@GetUser() user: UserRes): Promise<UserRes> {
    return user;
  }
}
