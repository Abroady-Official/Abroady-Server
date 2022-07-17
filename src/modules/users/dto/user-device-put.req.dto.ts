import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UserDevicePutReqDTO {
  @ApiProperty({
    description: '디바이스 토큰 값입니다.',
    required: true,
    example: 'device token here',
  })
  @IsNotEmpty()
  @IsString()
  deviceToken: string;
}
