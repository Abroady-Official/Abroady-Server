import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';
import { UserGetResDTO } from 'src/modules/users/dto/user-get.res.dto';
import { OK_TYPE } from '../../..';

@ApiExtraModels()
export class UserGetSuccess extends PickType(OK_TYPE, ['status'] as const) {
  @ApiProperty({
    type: 'string',
    title: '성공 메시지',
    example: '유저 정보 조회 성공',
  })
  message: string;

  @ApiProperty({
    type: UserGetResDTO,
  })
  data: UserGetResDTO;
}
