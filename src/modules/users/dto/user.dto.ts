import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  social: string;

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
