/* eslint-disable @typescript-eslint/ban-ts-comment */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { PrismaService } from 'src/prisma/prisma.service';

import { UserRes } from '@types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt-strategy') {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: any): Promise<UserRes> {
    return await this.prisma.user.findUniqueOrThrow({
      where: {
        id: payload?.id,
      },
      select: {
        id: true,
        email: true,
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
  }
}
