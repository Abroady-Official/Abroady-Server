import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';
import { AuthSigninResDTO } from 'src/modules/auth/dto/auth-signin.res.dto';
import { OK_TYPE } from '../../..';

@ApiExtraModels()
export class AuthSigninSuccess extends PickType(OK_TYPE, ['status'] as const) {
  @ApiProperty({
    type: 'string',
    title: '성공 메시지',
    example: '로그인 성공',
    description: '로그인에 성공하였습니다.',
  })
  message: string;

  @ApiProperty({
    type: AuthSigninResDTO,
  })
  data: AuthSigninResDTO;
}
