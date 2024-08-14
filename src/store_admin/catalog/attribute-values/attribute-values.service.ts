import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAttributeValueDto } from './dto/create-attribute-value.dto';
import { UpdateAttributeValueDto } from './dto/update-attribute-value.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/response/response.service';
import { AppError } from 'src/errors';

@Injectable()
export class AttributeValuesService {
  constructor(
    private prismaService: PrismaService,
    private responseService: ResponseService,
  ) {}
  async create(createAttributeValueDto: CreateAttributeValueDto) {
    try {
      const attributeValue = await this.prismaService.attributeValue.create({
        data: createAttributeValueDto,
      });
      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Success',
        attributeValue,
      );
    } catch (error) {
      console.error('Error creating attributeValue:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const attributeValue = await this.prismaService.attributeValue.findMany();

      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Success',
        attributeValue,
      );
    } catch (error) {
      console.error('Error creating attributeValue:', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const attributeValue = await this.prismaService.attributeValue.findUnique(
        {
          where: { id },
        },
      );
      if (!attributeValue) {
        throw new AppError(
          `Attribute Value with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Success',
        attributeValue,
      );
    } catch (error) {
      console.error('Error creating attributeValue:', error);
      throw error;
    }
  }

  async update(id: string, updateAttributeValueDto: UpdateAttributeValueDto) {
    try {
      const attributeValue = await this.prismaService.attributeValue.findUnique(
        {
          where: { id },
        },
      );
      if (!attributeValue) {
        throw new AppError(
          `Attribute Value with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }

      const updated = await this.prismaService.attributeValue.update({
        where: { id },
        data: updateAttributeValueDto,
      });
      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Success',
        updated,
      );
    } catch (error) {
      console.error('Error creating attributeValue:', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const attributeValue = await this.prismaService.attributeValue.findUnique(
        {
          where: { id },
        },
      );
      if (!attributeValue) {
        throw new AppError(
          `Attribute Value with ID ${id} not found`,
          HttpStatus.NOT_FOUND,
        );
      }
      await this.prismaService.attributeValue.delete({
        where: { id },
      });
      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Deleted successfully',
        {},
      );
    } catch (error) {
      console.error('Error creating attributeValue:', error);
      throw error;
    }
  }
  async setActiveStatus(id: string, isActive: boolean) {
    try {
      const attributeValue = await this.prismaService.attributeValue.update({
        where: { id },
        data: { is_active: isActive },
      });

      if (!attributeValue) {
        throw new AppError('Category not found', HttpStatus.NOT_FOUND);
      }

      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Success',
        attributeValue,
      );
    } catch (error) {
      console.error('Error fetching category:', error);
      throw error;
    }
  }
}
