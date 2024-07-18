import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as argon from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';

import { AppError } from 'src/errors';

import { LoginDTO } from './dto';

import type { UserRes } from '@types';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  public async login(dto: LoginDTO): Promise<UserRes & { token: string }> {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: {
        email: dto.email,
      },

      select: {
        id: true,
        email: true,
        password: true,
        first_name: true,
        middle_name: true,
        last_name: true,
        role: true,
        dob: true,
        is_active: true,
        title: true,
        gender: true,
        telephone: true,
        image_uri: true,
        created_at: true,
        updated_at: true,
        city: {
          select: {
            id: true,
            name: true,
            created_at: true,
            updated_at: true,
            country: {
              select: {
                id: true,
                name: true,
                short_code: true,
                code: true,
                created_at: true,
                updated_at: true,
              },
            },
            state: {
              select: {
                id: true,
                name: true,
                created_at: true,
                updated_at: true,
              },
            },
          },
        },
        user_access_rights: true,
      },
    });

    const isValidPassword = await argon.verify(user.password, dto.password);

    if (!isValidPassword)
      throw new AppError('Invalid password', HttpStatus.UNAUTHORIZED);

    delete user.password;

    return {
      ...user,
      token: await this.signToken(
        user.id,
        `${user.first_name} ${user.last_name}`,
      ),
    };
  }

  register(): void {}

  private signToken(id: string, name: string) {
    const payload = {
      id,
      name,
    };

    return this.jwt.signAsync(payload, {
      secret: this.config.get('JWT_SECRET'),
      expiresIn: this.config.get('JWT_EXPIRESIN'),
    });
  }
}
