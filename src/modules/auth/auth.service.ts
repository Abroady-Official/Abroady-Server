import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { rm, TOKEN_TYPE } from 'src/common/constants';
import { JwtPayload } from 'src/common/constants/jwt/jwtPayload';
import { ApiConfigService } from 'src/config/services/api-config.service';
import { PrismaService } from '../prisma/prisma.service';
import { authStrategy } from './common/auth.strategy';
import { SocialPlatform } from './common/auth.type';
import { AuthGetResDTO } from './dto/auth-get.res.dto';
import { AuthPostReqDTO } from './dto/auth-post.req.dto';
import { AuthPostResDTO } from './dto/auth-post.res.dto';
import { AuthSigninResDTO } from './dto/auth-signin.res.dto';
import { AuthTokenGetResDTO } from './dto/auth-token-get.res.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwt: JwtService,
    private readonly config: ApiConfigService,
    private readonly prisma: PrismaService,
  ) {}

  //* 소셜 로그인
  async signinSocial(social: SocialPlatform, token: string) {
    const uuid = await this.getUUID(social, token);
    const existedUser = await this.prisma.user.findUnique({ where: { uuid } });

    if (!existedUser) {
      return new AuthGetResDTO(social, uuid);
    }

    return await this.signin(existedUser.id);
  }

  //* 회원가입
  async signup(dto: AuthPostReqDTO) {
    try {
      await this.checkAlreadyNickname(dto.nickname);

      const user = await this.prisma.user.create({
        data: {
          ...dto,
          refreshToken: this.getRefreshToken(),
          profileImage: 'sample',
        },
      });

      const payload: JwtPayload = { ...user };

      return new AuthPostResDTO(user, this.getAccessToken(payload));
    } catch (error) {
      console.error(error);
      if (error instanceof ConflictException) {
        throw new ConflictException(rm.ALREADY_NICKNAME);
      }
      throw new BadRequestException(rm.SIGNIN_FAIL);
    }
  }

  //* 토큰 재발급
  async refreshToken(accessToken: string, refreshToken: string) {
    const decoded = this.jwt.verify(accessToken, { secret: this.config.jwtConfig.jwtSecret });

    if (decoded === TOKEN_TYPE.TOKEN_INVALID) throw new UnauthorizedException(rm.UNAUTHORIZED_USER);
    if (decoded === TOKEN_TYPE.TOKEN_EXPIRED) {
      const refresh = this.jwt.verify(refreshToken, { secret: this.config.jwtConfig.jwtSecret });

      if (refresh === TOKEN_TYPE.TOKEN_INVALID) throw new UnauthorizedException(rm.UNAUTHORIZED_USER);
      if (refresh === TOKEN_TYPE.TOKEN_EXPIRED) throw new UnauthorizedException(rm.EXPIRED_ALL_TOKEN);

      const newToken = await this.recreateToken(refreshToken);
      if (!newToken) throw new BadRequestException(rm.NO_USER);

      return new AuthTokenGetResDTO(newToken);
    }
  }

  //^ 토큰 재생성
  private async recreateToken(refreshToken: string) {
    const user = await this.prisma.user.findUnique({
      where: { refreshToken },
    });

    if (!user) throw new BadRequestException(rm.NO_USER);

    return this.getAccessToken(user);
  }

  // //^ 닉네임 중복 체크
  private async checkAlreadyNickname(nickname: string) {
    const isAlreadyNickname = await this.prisma.user.findUnique({
      where: { nickname },
    });

    if (isAlreadyNickname) {
      throw new ConflictException(rm.ALREADY_NICKNAME);
    }
  }

  // //^ 소셜 uuid 조회
  private async getUUID(social: string, token: string) {
    const user = await authStrategy[social].execute(token);
    return user;
  }

  // //^ 로그인
  private async signin(userId: number) {
    try {
      const user = await this.prisma.user.update({
        where: { id: userId },
        data: { refreshToken: this.getRefreshToken() },
      });
      const payload: JwtPayload = { ...user };

      return new AuthSigninResDTO(user, this.getAccessToken(payload));
    } catch (error) {
      console.error(error);
      throw new BadRequestException(rm.SIGNIN_FAIL);
    }
  }

  // //^ Refresh Token 발급
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

  //^ 유저 Validation
  async validateUser(payload: JwtPayload): Promise<JwtPayload> {
    const { id } = payload;
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new UnauthorizedException(rm.UNAUTHORIZED_USER);
    }
    return payload;
  }
}
