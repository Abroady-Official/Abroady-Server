import { sc } from '../..';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class ForbiddenError {
  @ApiProperty({
    type: 'number',
    description: 'HTTP 상태 코드',
    example: sc.FORBIDDEN,
  })
  status: number;

  @ApiProperty({
    type: 'array',
    title: '에러 메시지',
    example: '요청 값에 문제가 있습니다.',
    description: '접근을 거부합니다.',
  })
  message: any;

  @ApiProperty({
    type: 'string',
    description: '응답 데이터',
    example: '',
  })
  data: string;
}
