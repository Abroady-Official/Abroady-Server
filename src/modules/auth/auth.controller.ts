import { BadRequestException, Body, Controller, Get, Headers, Param, Post, UseFilters } from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { rm } from 'src/common/constants';
import { ResponseEntity } from 'src/common/constants/responseEntity';
import { AuthGetSuccess } from 'src/common/constants/swagger/domain/auth/AuthGetSuccess';
import { AuthPostSuccess } from 'src/common/constants/swagger/domain/auth/AuthPostSuccess';
import { AuthSigninSuccess } from 'src/common/constants/swagger/domain/auth/AuthSigninSuccess';
import { AuthTokenGetAccepted } from 'src/common/constants/swagger/domain/auth/AuthTokenGetAccepted';
import { AuthTokenGetSuccess } from 'src/common/constants/swagger/domain/auth/AuthTokenGetSuccess';
import { BadRequestError } from 'src/common/constants/swagger/error/BadRequestError';
import { ConflictError } from 'src/common/constants/swagger/error/ConflictError';
import { InternalServerError } from 'src/common/constants/swagger/error/InternalServerError';
import { UnauthorizedError } from 'src/common/constants/swagger/error/UnauthorizedError';
import { HttpExceptionFilter } from 'src/common/exceptions/http-exception.filter';
import { AuthService } from './auth.service';
import { AuthPostReqDTO } from './dto/auth-post.req.dto';
import { AuthParamDTO } from './dto/auth.param.dto';

@ApiTags('Auth')
@Controller('auth')
@UseFilters(HttpExceptionFilter)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //* 토큰 재발급
  @Get('/token')
  @ApiOperation({
    summary: '토큰 재발급',
  })
  @ApiHeader({
    name: 'accesstoken',
    required: true,
    description: '액세스 토큰 값을 의미합니다.',
  })
  @ApiHeader({
    name: 'refreshtoken',
    required: true,
    description: '리프레시 토큰 값을 의미합니다.',
  })
  @ApiOkResponse({
    description: '토큰 재발급 성공',
    type: AuthTokenGetSuccess,
  })
  @ApiAcceptedResponse({
    description: '토큰이 유효한 경우',
    type: AuthTokenGetAccepted,
  })
  @ApiUnauthorizedResponse({
    description: '유효하지 않은 소셜 유저/토큰입니다.',
    type: UnauthorizedError,
  })
  @ApiBadRequestResponse({
    description: '토큰 재발급 실패 / 값이 잘못되었습니다.',
    type: BadRequestError,
  })
  @ApiInternalServerErrorResponse({
    description: '서버 내부 오류',
    type: InternalServerError,
  })
  async refreshToken(@Headers('accesstoken') accesstoken: string, @Headers('refreshtoken') refreshtoken: string) {
    if (!accesstoken || !refreshtoken) throw new BadRequestException(rm.NULL_VALUE);
    const data = await this.authService.refreshToken(accesstoken, refreshtoken);
    if (!data) return ResponseEntity.OK_WITH(rm.VALID_TOKEN);
    return ResponseEntity.OK_WITH_DATA(rm.CREATE_TOKEN_SUCCESS, data);
  }

  //* 소셜 로그인
  @Get('/:social')
  @ApiOperation({
    summary: '소셜 로그인',
  })
  @ApiOkResponse({
    description: '로그인 성공',
    type: AuthSigninSuccess,
  })
  @ApiAcceptedResponse({
    description: '가입하지 않은 유저입니다.',
    type: AuthGetSuccess,
  })
  @ApiOkResponse({
    description: '로그인 성공',
    type: AuthSigninSuccess,
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
  async authUser(@Param() param: AuthParamDTO, @Headers('token') token: string) {
    const data = await this.authService.signinSocial(param.social, token);

    if (data.getType === 'signup') {
      return ResponseEntity.ACCEPTED_WITH_DATA(rm.NO_USER, data);
    }
    return ResponseEntity.OK_WITH_DATA(rm.SIGNIN_SUCCESS, data);
  }

  //* 회원가입
  @Post()
  @ApiOperation({
    summary: '회원가입',
    description: `
    소셜 로그인에서 받은 social, uuid 정보를 받아 회원가입을 진행합니다. \n
    이미 사용중인 아이디일 시 409 에러를 출력합니다. \n
    `,
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
  async signup(@Body() body: AuthPostReqDTO) {
    const data = await this.authService.signup(body);
    return ResponseEntity.CREATED_WITH_DATA(rm.SIGNUP_SUCCESS, data);
  }
}
