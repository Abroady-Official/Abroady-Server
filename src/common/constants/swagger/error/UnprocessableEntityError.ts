import { sc } from '../..';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class UnprocessableEntityError {
  @ApiProperty({
    type: 'number',
    description: 'HTTP 상태 코드',
    example: sc.UNPROCESSABLE,
  })
  status: number;

  @ApiProperty({
    type: 'string',
    title: '에러 메시지',
    example:
      '서버가 요청을 이해하고 요청 문법도 올바르지만 요청된 지시를 따를 수 없음을 나타냅니다.',
    description:
      '서버가 요청을 이해하고 요청 문법도 올바르지만 요청된 지시를 따를 수 없음을 나타냅니다.',
  })
  message: string;

  @ApiProperty({
    type: 'string',
    description: '응답 데이터',
    example: '',
  })
  data: string;
}
