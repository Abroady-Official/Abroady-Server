import { sc } from '../..';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';

@ApiExtraModels()
export class UnauthorizedError {
  @ApiProperty({
    type: 'number',
    description: 'HTTP 상태 코드',
    example: sc.UNAUTHORIZED,
  })
  status: number;

  @ApiProperty({
    type: 'string',
    title: '에러 메시지',
    example: '인증 되지 않은 요청입니다.',
    description: 'Unauthorized',
  })
  message: string;

  @ApiProperty({
    type: 'string',
    description: '인증 되지 않은 요청입니다.',
    example: 'Unauthorized',
  })
  data: string;
}
