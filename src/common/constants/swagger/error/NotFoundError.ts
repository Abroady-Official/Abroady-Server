import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { sc } from '../..';

@ApiExtraModels()
export class NotFoundError {
  @ApiProperty({
    type: 'number',
    description: 'HTTP 상태 코드',
    example: sc.NOT_FOUND,
  })
  status: number;

  @ApiProperty({
    type: 'string',
    title: '에러 메시지',
    example: '요청 값을 찾을 수 없습니다.',
    description: '요청 값을 찾을 수 없습니다.',
  })
  message: string;

  @ApiProperty({
    type: 'string',
    description: '에러 데이터',
    example: 'Not Found',
  })
  data: string;
}
