import { Transform } from 'class-transformer';
import { IsIn, IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class AuthPostReqDTO {
  @IsNotEmpty()
  @IsString()
  @IsIn(['kakao'])
  social: string;

  @IsNotEmpty()
  @IsString()
  uuid: string;

  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9ㄱ-ㅎ가-힣]+$/)
  @MaxLength(10)
  @Transform((params) => params.value.replace(/ /g, ''))
  nickname: string;
}
