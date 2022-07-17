import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class PostPutParamDTO {
  @ApiProperty({
    example: 1,
    description: '업데이트하고자 하는 게시글의 id 값입니다.',
    required: true,
  })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  postId: number;
}
