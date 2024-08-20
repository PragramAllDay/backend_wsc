import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/response/response.service';
import { AppError } from 'src/errors';

@Injectable()
export class SuppliersService {
  constructor(
    private prismaService: PrismaService,
    private responseService: ResponseService,
  ) {}

  async create(dto: CreateSupplierDto) {
    try {
      const store = await this.prismaService.store.findUnique({
        where: {
          id: dto.store_id,
        },
      });
      if (!store) {
        throw new AppError('store not found', HttpStatus.NOT_FOUND);
      }

      const supplier = await this.prismaService.supplier.create({
        data: dto,
      });

      return this.responseService.sendResponse(
        HttpStatus.CREATED,
        'Supplier created successfully',
        supplier,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const suppliers = await this.prismaService.supplier.findMany({});

      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Suppliers fetched successfully',
        suppliers,
      );
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const supplier = await this.prismaService.supplier.findUnique({
        where: { id },
      });
      if (!supplier) {
        throw new AppError('Supplier not found', HttpStatus.NOT_FOUND);
      }
      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Success',
        supplier,
      );
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    try {
      const supplier = await this.prismaService.supplier.findUnique({
        where: { id },
      });
      if (!supplier) {
        throw new AppError('Supplier not found', HttpStatus.NOT_FOUND);
      }
      const updated = await this.prismaService.supplier.update({
        where: { id },
        data: updateSupplierDto,
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
      const supplier = await this.prismaService.supplier.findUnique({
        where: { id },
      });
      if (!supplier) {
        throw new AppError('Supplier not found', HttpStatus.NOT_FOUND);
      }

      await this.prismaService.supplier.delete({
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
}
