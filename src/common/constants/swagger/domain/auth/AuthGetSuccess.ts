import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';
import { AuthGetResDTO } from 'src/modules/auth/dto/auth-get.res.dto';
import { ACCEPTED_TYPE } from '../../..';

@ApiExtraModels()
export class AuthGetSuccess extends PickType(ACCEPTED_TYPE, ['status'] as const) {
  @ApiProperty({
    type: 'string',
    title: '성공 메시지',
    example: '가입하지 않은 유저입니다.',
    description: '회원가입을 진행할 수 있습니다.',
  })
  message: string;

  @ApiProperty({
    type: AuthGetResDTO,
  })
  data: AuthGetResDTO;
}
