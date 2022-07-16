import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { rm } from 'src/common/constants';
import { JwtPayload } from 'src/common/constants/jwt/jwtPayload';
import { ApiConfigService } from 'src/config/services/api-config.service';
import { PrismaService } from '../prisma/prisma.service';
import { AuthGetResDTO } from './dto/auth-get.res.dto';
import { AuthPostReqDTO } from './dto/auth-post.req.dto';
import { AuthPostResDTO } from './dto/auth-post.res.dto';
import { AuthSigninResDTO } from './dto/auth-signin.res.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ApiConfigService,
  ) {}

  // //* 소셜 로그인
  // async signinSocial(social: string, token: string) {
  //   const uuid = await this.getUuid(social, token);
  //   const existedUser = await this.prisma.user.findUnique({ where: { uuid } });

  //   if (!existedUser) {
  //     return new AuthGetResDTO(social, uuid);
  //   }
  //   return await this.signin(existedUser.id);
  // }

  // //* 회원가입
  // async signup(dto: AuthPostReqDTO, image: string) {
  //   try {
  //     await this.checkAlreadyNickname(dto.nickname);

  //     const user = await this.prisma.user.create({
  //       data: {
  //         ...dto,
  //         refreshToken: this.getRefreshToken(),
  //         profileImage: image,
  //         Badge: { create: {} },
  //       },
  //     });
  //     const payload: JwtPayload = { ...user };

  //     return new AuthPostResDTO(user, this.getAccessToken(payload));
  //   } catch (error) {
  //     console.error(error);
  //     if (error instanceof ConflictException) {
  //       throw new ConflictException(rm.ALREADY_NICKNAME);
  //     }
  //     throw new BadRequestException(rm.SIGNUP_FAIL);
  //   }
  // }

  // //* 유저 Validation
  // async validateUser(payload: JwtPayload) {
  //   const { id } = payload;
  //   const user = await this.prisma.user.findFirst({
  //     where: {
  //       id,
  //       isDeleted: false,
  //     },
  //   });

  //   if (!user) {
  //     throw new UnauthorizedException(rm.UNAUTHORIZED_USER);
  //   }
  //   return payload;
  // }

  // //^ 닉네임 중복 체크
  // private async checkAlreadyNickname(nickname: string) {
  //   const isAlreadyNickname = await this.prisma.user.findUnique({
  //     where: { nickname },
  //   });

  //   if (isAlreadyNickname) {
  //     throw new ConflictException(rm.ALREADY_NICKNAME);
  //   }
  // }

  // //^ 소셜 uuid 조회
  // private async getUuid(social: string, token: string) {
  //   switch (social) {
  //     case 'kakao':
  //       return await this.signinKakao(token);
  //     default:
  //       throw new BadRequestException(rm.OUT_OF_VALUE);
  //   }
  // }

  // //^ 카카오 유저 조회
  // private async signinKakao(token: string) {
  //   const url = 'https://kapi.kakao.com/v2/user/me';

  //   try {
  //     const user = await axios.get(url, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });

  //     return String(user.data.id);
  //   } catch (error) {
  //     console.error(error);
  //     throw new UnauthorizedException(rm.UNAUTHORIZED_SOCIAL);
  //   }
  // }

  // //^ 로그인
  // private async signin(userId: number) {
  //   try {
  //     const user = await this.prisma.user.update({
  //       where: { id: userId },
  //       data: { refreshToken: this.getRefreshToken() },
  //     });
  //     const payload: JwtPayload = { ...user };

  //     return new AuthSigninResDTO(user, this.getAccessToken(payload));
  //   } catch (error) {
  //     console.error(error);
  //     throw new BadRequestException(rm.SIGNIN_FAIL);
  //   }
  // }

  //^ Refresh Token 발급
  private getRefreshToken() {
    return this.jwt.sign(
      {},
      {
        secret: this.config.jwtConfig.jwtSecret,
        expiresIn: this.config.jwtConfig.jwtRefreshExpiration,
      },
    );
  }

  //^ Access Token 발급
  private getAccessToken(payload: JwtPayload) {
    return this.jwt.sign(payload, {
      secret: this.config.jwtConfig.jwtSecret,
      expiresIn: this.config.jwtConfig.jwtAccessExpiration,
    });
  }
}
