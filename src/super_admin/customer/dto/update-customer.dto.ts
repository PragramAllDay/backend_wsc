import { PartialType } from '@nestjs/swagger';
import { CreateCustomerDto } from 'src/auth/dto/register.dto';

export class UpdateCustomerDto extends PartialType(CreateCustomerDto) {}
