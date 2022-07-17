import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  //* 전체 카테고리 조회
  async getCategories() {
    const categories = await this.prisma.category.findMany();
    return categories;
  }
}
