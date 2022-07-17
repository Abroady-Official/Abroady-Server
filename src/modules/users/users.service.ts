import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserDevicePutReqDTO } from './dto/user-device-put.req.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  //* 전체 유저 조회
  async getUsers() {
    return await this.prisma.user.findMany();
  }

  //* userId로 유저 조회
  async getUserById(userId: number): Promise<any> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new NotFoundException('해당 userId를 가진 유저가 존재하지 않습니다.');
    }
    return user;
  }

  //* 유저 기기 등록
  async updateUserDevice(dto: UserDevicePutReqDTO, userId: number) {
    const { deviceToken } = dto;

    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        deviceToken,
      },
    });
  }
}
