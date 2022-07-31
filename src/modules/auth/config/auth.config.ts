import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import { rm } from 'src/common/constants';

export class auth {
  //* 카카오 OAuth 통신
  async kakaoAuth(kakaoAccessToken: string) {
    try {
      const user = await axios({
        method: 'get',
        url: 'https://kapi.kakao.com/v2/user/me',
        headers: {
          Authorization: `Bearer ${kakaoAccessToken}`,
        },
      });

      const uuid = user.data.id;

      if (!uuid) throw new UnauthorizedException(rm.UNAUTHORIZED_SOCIAL);

      return uuid;
    } catch (error) {
      console.error(error);
      throw new BadRequestException(rm.SIGNIN_FAIL);
    }
  }

  //* 애플 OAuth 통신
  async appleAuth(appleAccessToken: string) {
    try {
      const user = jwt.decode(appleAccessToken);
      const uuid = user.sub as string;

      if (!uuid || !user) throw new UnauthorizedException(rm.UNAUTHORIZED_SOCIAL);
      return uuid;
    } catch (error) {
      console.error(error);

      return null;
    }
  }

  //* 구글 OAuth 통신
  async googleAuth(googleAccessToken: string) {
    try {
      const user = jwt.decode(googleAccessToken);
      const uuid = user.sub as string;

      if (!uuid || !user) throw new UnauthorizedException(rm.UNAUTHORIZED_SOCIAL);
      return uuid;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
}
