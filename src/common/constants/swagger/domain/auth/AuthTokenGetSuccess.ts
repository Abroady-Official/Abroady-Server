import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';
import { AuthSigninResDTO } from 'src/modules/auth/dto/auth-signin.res.dto';
import { AuthTokenGetResDTO } from 'src/modules/auth/dto/auth-token-get.res.dto';
import { OK_TYPE } from '../../..';

@ApiExtraModels()
export class AuthTokenGetSuccess extends PickType(OK_TYPE, ['status'] as const) {
  @ApiProperty({
    type: 'string',
    title: '성공 메시지',
    example: '토큰 재발급 성공',
    description: '토큰 재발급에 성공하였습니다.',
  })
  message: string;

  @ApiProperty({
    type: AuthTokenGetResDTO,
  })
  data: AuthTokenGetResDTO;
}
