import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString } from 'class-validator';

export class AuthGetParamDTO {
  @ApiProperty({
    example: 'kakao',
    description: "'kakao'만 가능합니다.",
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsIn(['kakao'])
  social: string;
}
