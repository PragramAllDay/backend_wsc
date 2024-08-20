import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ResponseService } from 'src/response/response.service';
import { AppError } from 'src/errors';

@Injectable()
export class ProductsService {
  constructor(
    private prismaService: PrismaService,
    private responseService: ResponseService,
  ) {}

  async create(createProductDto: CreateProductDto) {
    try {
      const {
        store_id,
        supplier_id,
        packed_as,
        attributes,
        categories,
        ...rest
      } = createProductDto;
      const product = await this.prismaService.product.create({
        data: {
          ...rest,
          packed_as: packed_as,
          store: {
            connect: {
              id: store_id,
            },
          },
          supplier: {
            connect: {
              id: createProductDto.supplier_id,
            },
          },
          attributes: {
            connect: attributes.map((attributeId) => ({ id: attributeId })),
          },
          categories: {
            connect: categories.map((categoryId) => ({ id: categoryId })),
          },
        },
      });

      return this.responseService.sendResponse(
        HttpStatus.CREATED,
        'Product created successfully',
        product,
      );
    } catch (error) {
      throw error;
    }
  }

  async findAll() {
    try {
      const products = await this.prismaService.product.findMany({
        include: {
          attributes: true,
          categories: true,
          supplier: true,
        },
      });
      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Products retrieved successfully',
        products,
      );
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const product = await this.prismaService.product.findUnique({
        where: { id },
        include: {
          attributes: true,
          categories: true,
          supplier: true,
        },
      });
      if (!product) {
        throw new AppError('Product not found', HttpStatus.NOT_FOUND);
      }
      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Product retrieved successfully',
        product,
      );
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    try {
      const { attributes, categories, ...rest } = updateProductDto;
      const product = await this.prismaService.product.update({
        where: { id },
        data: {
          ...rest,
          updated_at: new Date(),
        },
      });
      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Product updated successfully',
        product,
      );
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      await this.prismaService.product.delete({ where: { id } });
      return this.responseService.sendResponse(
        HttpStatus.OK,
        'Product deleted successfully',
        null,
      );
    } catch (error) {
      throw error;
    }
  }
}
