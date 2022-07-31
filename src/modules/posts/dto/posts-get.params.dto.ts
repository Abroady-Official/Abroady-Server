import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PostGetParamDTO {
  @ApiProperty({
    example: 1,
    description: '조회하고자하는 게시글의 id 값입니다.',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  postId: number;
}
