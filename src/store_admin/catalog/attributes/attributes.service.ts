import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateAttributeDto } from './dto/create-attribute.dto';
import { UpdateAttributeDto } from './dto/update-attribute.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/response/response.service';
import AppError from 'src/errors/AppError';

@Injectable()
export class AttributesService {
  constructor(
    private prismaService: PrismaService,
    private responseService: ResponseService,
  ) {}

  async create(dto: CreateAttributeDto) {
    try {
      const store = await this.prismaService.store.findUnique({
        where: {
          id: dto.store_id,
        },
      });
      if (!store) {
        throw new AppError('store not found', HttpStatus.NOT_FOUND);
      }

      const attribute = await this.prismaService.attribute.create({
        data: dto,
      });

      return this.responseService.sendResponse(
        HttpStatus.CREATED,
        'Attribute created successfully',
        attribute,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const attributes = await this.prismaService.attribute.findMany({
        include: { attribute_values: true },
      });

      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Attribute fetched successfully',
        attributes,
      );
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const attribute = await this.prismaService.attribute.findUnique({
        where: { id },
        include: { attribute_values: true },
      });
      if (!attribute) {
        throw new AppError('Attribute not found', HttpStatus.NOT_FOUND);
      }
      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Success',
        attribute,
      );
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateAttributeDto: UpdateAttributeDto) {
    try {
      const attribute = await this.prismaService.attribute.findUnique({
        where: { id },
        include: { attribute_values: true },
      });
      if (!attribute) {
        throw new AppError('Attribute not found', HttpStatus.NOT_FOUND);
      }

      const updated = await this.prismaService.attribute.update({
        where: { id },
        data: updateAttributeDto,
      });
      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Success',
        updated,
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const attribute = await this.prismaService.attribute.findUnique({
        where: { id },
      });
      if (!attribute) {
        throw new AppError('Attribute not found', HttpStatus.NOT_FOUND);
      }

      await this.prismaService.attribute.delete({
        where: { id },
      });

      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Deleted successfully',
        {},
      );
    } catch (error) {
      throw error;
    }
  }
  async getAttributesByStoreId(storeId: string) {
    try {
      const store = await this.prismaService.store.findUnique({
        where: {
          id: storeId,
        },
      });
      if (!store) {
        throw new AppError('store not found', HttpStatus.NOT_FOUND);
      }
      return await this.prismaService.attribute.findMany({
        where: { store_id: storeId },
      });
    } catch (error) {
      console.error('Error fetching Attribute:', error);
      throw error;
    }
  }

  async setActiveStatus(id: string, isActive: boolean) {
    try {
      const attribute = await this.prismaService.attribute.update({
        where: { id },
        data: { is_active: isActive },
      });

      if (!attribute) {
        throw new AppError('Attribute not found', HttpStatus.NOT_FOUND);
      }

      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Success',
        attribute,
      );
    } catch (error) {
      console.error('Error fetching Attribute:', error);
      throw error;
    }
  }
}
