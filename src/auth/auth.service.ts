import { Injectable, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

import * as argon from 'argon2';

import { PrismaService } from 'src/prisma/prisma.service';

import { AppError } from 'src/errors';

import { LoginDTO } from './dto';

import type { UserRes } from '@types';
import { RegisterUserDto } from './dto/register.dto';
import { Role } from '@prisma/client';
import { ResponseService } from 'src/response/response.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
    private responseService: ResponseService,
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

  async register(registerUserDto: RegisterUserDto) {
    const { email, password, ...rest } = registerUserDto;
    try {
      // Check if the email already exists
      await this.checkIfUserExists(email);
      const hashedPassword = await argon.hash(password);
      // Create the new user
      const user = await this.prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          first_name: rest.first_name,
          middle_name: rest.middle_name,
          last_name: rest.last_name,
          dob: rest.dob,
          title: rest.title,
          city: {
            connect: {
              id: rest.city_id,
            },
          },
          gender: rest.gender,
          telephone: rest.telephone,
          image_uri: rest.image_uri,
          company: rest.company,
          vatno: rest.vatno,
          regno: rest.regno,
          is_active: true,
          newsletter_subscription: rest.newsletter_subscription,
          special_price: rest.special_price,
          website: rest.website,
          is_vat: rest.is_vat,
          sales_agent_code: rest.sales_agent_code,
          created_at: new Date(),
          Address: {
            create: {
              address: rest.address,
              contact_person: rest.contact_person,
              email: email,
              telephone: rest.telephone,
              zip: rest.zip,
              building: '',
              city: {
                connect: {
                  id: rest.city_id,
                },
              },
            },
          },
          user_access_rights: {
            create: {
              category_module: false,
            },
          },
          role: Role.CUSTOMER,
        },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          role: true,
          created_at: true,
          updated_at: true,
        },
      });
      return await this.responseService.sendResponse(
        HttpStatus.OK,
        'Success',
        user,
      );
    } catch (error) {
      throw error;
    }
  }

  private async checkIfUserExists(email: string): Promise<void> {
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new AppError('Account already exists', HttpStatus.UNAUTHORIZED);
    }
  }

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
