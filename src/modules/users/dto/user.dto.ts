import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsArray, IsIn, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';
import { SocialPlatform } from 'src/modules/auth/common/auth.type';

export class UserDTO {
  @ApiProperty()
  id: number;

  @ApiProperty({
    description: `
    유저가 가입한 소셜
    'kakao', 'apple', 'google' 만 사용 가능합니다.
    `,
    required: true,
  })
  @IsString()
  @IsIn(['kakao', 'apple', 'google'])
  @IsNotEmpty()
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
  @IsString()
  country: string;

  @ApiProperty()
  @IsArray()
  language: string[];

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
