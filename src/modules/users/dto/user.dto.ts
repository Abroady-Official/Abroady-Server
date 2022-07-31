import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
import { SocialPlatform } from 'src/modules/auth/common/auth.type';

export class UserDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsIn(['kakao', 'apple', 'google'])
  social: SocialPlatform;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  uuid: string;

  @ApiProperty()
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9ㄱ-ㅎ가-힣]+$/)
  @MaxLength(10)
  @Transform((params) => params.value.replace(/ /g, ''))
  nickname: string;

  @ApiProperty()
  profileImage: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  deviceToken: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  isDeleted: boolean;
}
