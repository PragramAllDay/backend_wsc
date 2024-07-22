import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { AuthService } from './auth.service';

import { UserRes } from '@types';

import { LoginDTO } from './dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  public async login(
    @Body() dto: LoginDTO,
  ): Promise<UserRes & { token: string }> {
    return this.authService.login(dto);
  }
}
