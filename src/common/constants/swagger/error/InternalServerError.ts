import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { sc } from '../..';

@ApiExtraModels()
export class InternalServerError {
  @ApiProperty({
    type: 'number',
    description: 'HTTP 상태 코드',
    example: sc.INTERNAL_SERVER_ERROR,
  })
  status: number;

  @ApiProperty({
    type: 'string',
    title: '응답 메시지',
    description: 'Server Error',
    example: '서버 내부 오류입니다.',
  })
  message: string;

  @ApiProperty({
    type: 'string',
    description: '서버 내부 오류입니다.',
    example: 'Server Error',
  })
  data: string;
}
