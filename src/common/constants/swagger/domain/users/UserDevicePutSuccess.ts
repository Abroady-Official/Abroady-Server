import { ApiExtraModels, ApiProperty, PickType } from '@nestjs/swagger';
import { OK_TYPE } from '../../..';

@ApiExtraModels()
export class UserDevicePutSuccess extends PickType(OK_TYPE, ['status'] as const) {
  @ApiProperty({
    type: 'string',
    title: '성공 메시지',
    example: '유저 기기 등록 성공',
  })
  message: string;
}
