import { ApiProperty } from '@nestjs/swagger';
import { SocialPlatform } from 'src/modules/auth/common/auth.type';

export class UserDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  social: SocialPlatform;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
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
