import { HttpStatus, Injectable } from '@nestjs/common';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { ResponseService } from 'src/response/response.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthService } from 'src/auth/auth.service';
import { CreateCustomerDto, RegisterUserDto } from 'src/auth/dto/register.dto';

import * as argon from 'argon2';
import { Role } from '@prisma/client';
import { AppError } from 'src/errors';
@Injectable()
export class CustomerService {
  constructor(
    private prismaService: PrismaService,
    private responseService: ResponseService,
    private authService: AuthService,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    try {
      //create random password
      const hashedPassword = await argon.hash('Abc1234#');
      const registerUserDto = new RegisterUserDto();
      Object.assign(registerUserDto, createCustomerDto);
      registerUserDto.password = hashedPassword;
      const customer = this.authService.register(registerUserDto);
      return this.responseService.sendResponse(
        HttpStatus.CREATED,
        'Customer created successfully',
        customer,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const users = await this.prismaService.user.findMany({
        where: {
          role: Role.CUSTOMER,
        },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          middle_name: true,
          company: true,
          regno: true,
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
                },
              },
            },
          },
        },
      });

      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Attribute fetched successfully',
        users,
      );
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.prismaService.user.findUnique({
        where: { id },
        select: {
          id: true,
          email: true,
          first_name: true,
          last_name: true,
          middle_name: true,
          company: true,
          regno: true,
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
                },
              },
            },
          },
        },
      });
      if (!user) {
        throw new AppError('User not found', HttpStatus.NOT_FOUND);
      }
      return this.responseService.sendResponse(HttpStatus.OK, 'Success', user);
    } catch (error) {
      throw error;
    }
  }

  // update(id: string, updateCustomerDto: UpdateCustomerDto) {
  //   return `This action updates a #${id} customer`;
  // }

  async setActiveStatus(id: string, isActive: boolean) {
    try {
      const user = await this.prismaService.user.update({
        where: { id },
        data: { is_active: isActive },
      });

      if (!user) {
        throw new AppError('User not found', HttpStatus.NOT_FOUND);
      }

      return this.responseService.sendResponse(HttpStatus.OK, 'Success', user);
    } catch (error) {
      console.error('Error fetching Attribute:', error);
      throw error;
    }
  }

  // async remove(id: string) {
  //   try {
  //     const user = await this.prismaService.user.findUnique({
  //       where: { id },
  //     });
  //     if (!user) {
  //       throw new AppError('User not found', HttpStatus.NOT_FOUND);
  //     }
  //     await this.prismaService.user.delete({
  //       where: { id },
  //     });
  //     return this.responseService.sendResponse(
  //       HttpStatus.OK,
  //       'Deleted successfully',
  //       {},
  //     );
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
