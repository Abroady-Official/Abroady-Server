import { ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";

export class UserGetResDTO {
  @ApiProperty() @Exclude() private readonly nickname: string;
  @ApiProperty() @Exclude() private readonly profileImage: string;
}
