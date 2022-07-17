import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PostGetCategoryParamDTO {
  @ApiProperty({
    example: 1,
    description: '조회하고자하는 카테고리의 id 값입니다.',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  categoryId: number;
}
