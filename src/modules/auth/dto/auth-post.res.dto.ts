import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class AuthPostResDTO {
  @ApiProperty() @Exclude() private readonly id: number;
  @ApiProperty() @Exclude() private readonly nickname: string;
  @ApiProperty() @Exclude() private readonly accessToken: string;
  @ApiProperty() @Exclude() private readonly refreshToken: string;

  constructor(user: User, accessToken: string) {
    this.id = user.id;
    this.nickname = user.nickname;
    this.accessToken = accessToken;
    this.refreshToken = user.refreshToken;
  }

  @Expose()
  get getId(): number {
    return this.id;
  }

  @Expose()
  get getNickname(): string {
    return this.nickname;
  }

  @Expose()
  get getAccessToken(): string {
    return this.accessToken;
  }

  @Expose()
  get getRefreshToken(): string {
    return this.refreshToken;
  }
}
