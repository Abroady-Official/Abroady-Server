import { Body, Controller, Get, Headers, Param, Post, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { rm } from 'src/common/constants';
import { ResponseEntity } from 'src/common/constants/responseEntity';
import { AuthGetSuccess } from 'src/common/constants/swagger/domain/auth/AuthGetSuccess';
import { AuthPostSuccess } from 'src/common/constants/swagger/domain/auth/AuthPostSuccess';
import { AuthSigninSuccess } from 'src/common/constants/swagger/domain/auth/AuthSigninSuccess';
import { BadRequestError } from 'src/common/constants/swagger/error/BadRequestError';
import { ConflictError } from 'src/common/constants/swagger/error/ConflictError';
import { InternalServerError } from 'src/common/constants/swagger/error/InternalServerError';
import { UnauthorizedError } from 'src/common/constants/swagger/error/UnauthorizedError';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { ApiConfigService } from 'src/config/services/api-config.service';
import { AwsS3Service } from 'src/config/services/aws-s3.service';
import { AuthService } from './auth.service';
import { AuthGetHeaderDTO } from './dto/auth-get.header.dto';
import { AuthGetParamDTO } from './dto/auth-get.param.dto';
import { AuthPostReqDTO } from './dto/auth-post.req.dto';

@ApiTags('Auth')
@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly awsS3Service: AwsS3Service,
    private readonly config: ApiConfigService,
  ) {}

  //* 소셜 로그인
  @Get('/:social')
  @ApiOperation({
    summary: '소셜 로그인',
    description: `
    social은 Params로, 소셜 token은 Headers로 받아 소셜 로그인을 진행합니다. \n
    존재하지 않은 소셜 로그인 정보일 시 202를 출력하고 이후 회원가입을 진행해야 합니다. \n
    소셜 토큰이 유효하지 않을 시 401 에러를 출력합니다. \n
    `,
  })
  @ApiOkResponse({
    description: '로그인 성공',
    type: AuthSigninSuccess,
  })
  @ApiAcceptedResponse({
    description: '가입하지 않은 유저입니다.',
    type: AuthGetSuccess,
  })
  @ApiUnauthorizedResponse({
    description: '유효하지 않은 소셜 유저입니다.',
    type: UnauthorizedError,
  })
  @ApiBadRequestResponse({
    description: '로그인 실패 / 파라미터 값이 잘못되었습니다.',
    type: BadRequestError,
  })
  @ApiInternalServerErrorResponse({
    description: '서버 내부 오류',
    type: InternalServerError,
  })
  async authUser(@Param() param: AuthGetParamDTO, @Headers() header: AuthGetHeaderDTO) {
    // const data = await this.authService.signinSocial(param.social, header.token);
    // if (data.getType === 'signup') {
    //   return ResponseEntity.ACCEPTED_WITH_DATA(rm.NO_USER, data);
    // }
    // return ResponseEntity.OK_WITH_DATA(rm.SIGNIN_SUCCESS, data);
  }

  //* 회원가입
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({
    summary: '회원가입',
    description: `
    소셜 로그인에서 받은 social, uuid와 nickname 정보를 받아 회원가입을 진행합니다. \n
    프로필 이미지 파일이 없을 시 기본 이미지가 선택됩니다. \n
    이미 사용중인 nickname일 시 409 에러를 출력합니다. \n
    `,
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        social: { type: 'string', description: "'kakao'만 가능합니다.", example: 'kakao' },
        uuid: { type: 'string', description: '소셜 로그인한 유저의 고유 값입니다.' },
        nickname: { type: 'string', description: '한글, 영어, 숫자 포함 최대 10자 가능합니다.' },
        file: {
          type: 'string',
          format: 'binary',
          description: '프로필 이미지입니다. 이미지를 보내지 않을 시 체크를 해제합니다.',
        },
      },
      required: ['social', 'uuid', 'nickname'],
    },
  })
  @ApiCreatedResponse({
    description: '회원 가입 성공',
    type: AuthPostSuccess,
  })
  @ApiConflictResponse({
    description: '이미 사용중인 닉네임입니다.',
    type: ConflictError,
  })
  @ApiBadRequestResponse({
    description: '회원 가입 실패',
    type: BadRequestError,
  })
  @ApiInternalServerErrorResponse({
    description: '서버 내부 오류',
    type: InternalServerError,
  })
  async signup(@Body() dto: AuthPostReqDTO, @UploadedFile() file?: Express.MulterS3.File) {
    // const image = file ? await this.awsS3Service.uploadFile(file) : this.config.defaultImage;
    // const data = await this.authService.signup(dto, image);
    // return ResponseEntity.CREATED_WITH_DATA(rm.SIGNUP_SUCCESS, data);
  }
}
