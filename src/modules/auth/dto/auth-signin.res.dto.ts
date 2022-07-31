import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude, Expose } from 'class-transformer';

export class AuthSigninResDTO {
  @ApiProperty() @Exclude() private readonly type: string;
  @ApiProperty() @Exclude() private readonly id: number;
  @ApiProperty() @Exclude() private readonly accessToken: string;
  @ApiProperty() @Exclude() private readonly refreshToken: string;

  constructor(user: User, accessToken: string) {
    this.type = 'signin';
    this.id = user.id;
    this.accessToken = accessToken;
    this.refreshToken = user.refreshToken;
  }

  @Expose()
  get getType(): string {
    return this.type;
  }

  @Expose()
  get getId(): number {
    return this.id;
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
