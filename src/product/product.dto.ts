import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export enum ProductOrder {
  ascendant = 'ascendant',
  descendant = 'descendant',
  lowestToHighest = 'lowestToHighest',
  highestToLowest = 'highestToLowest',
  default = 'default',
}

export class ProductDTO {
  @IsEnum(ProductOrder)
  @ApiPropertyOptional({ description: 'Product ordering parameter' })
  @IsOptional()
  order?: ProductOrder;
}
