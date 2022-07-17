import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ResponseEntity } from 'src/common/constants/responseEntity';
import { CategoriesService } from './categories.service';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  //* 전체 카테고리 조회
  @Get()
  @ApiOperation({
    summary: '전체 카테고리 조회',
    description: ``,
  })
  async getCategories() {
    const categories = await this.categoriesService.getCategories();
    return ResponseEntity.OK_WITH_DATA('', categories);
  }
}
