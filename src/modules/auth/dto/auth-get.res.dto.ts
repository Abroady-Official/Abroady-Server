import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class AuthGetResDTO {
  @ApiProperty() @Exclude() private readonly type: string;
  @ApiProperty() @Exclude() private readonly social: string;
  @ApiProperty() @Exclude() private readonly uuid: string;

  constructor(social: string, uuid: string) {
    this.type = 'signup';
    this.social = social;
    this.uuid = uuid;
  }

  @Expose()
  get getType(): string {
    return this.type;
  }

  @Expose()
  get getSocial(): string {
    return this.social;
  }

  @Expose()
  get getUuid(): string {
    return this.uuid;
  }
}
