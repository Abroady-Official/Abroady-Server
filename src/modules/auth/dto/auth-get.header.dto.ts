import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class AuthGetHeaderDTO {
  @ApiProperty({
    description: '소셜 token을 입력합니다.',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  token: string;
}
