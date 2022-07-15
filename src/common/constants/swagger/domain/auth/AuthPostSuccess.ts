import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';
import { AuthPostResDTO } from 'src/modules/auth/dto/auth-post.res.dto';
import { CREATED_TYPE } from '../../..';

@ApiExtraModels()
export class AuthPostSuccess extends PickType(CREATED_TYPE, ['status'] as const) {
  @ApiProperty({
    type: 'string',
    title: '성공 메시지',
    example: '회원 가입 성공',
    description: '회원 가입에 성공하였습니다.',
  })
  message: string;

  @ApiProperty({
    type: AuthPostResDTO,
  })
  data: AuthPostResDTO;
}
