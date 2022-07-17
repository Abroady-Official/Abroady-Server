import { Injectable } from '@nestjs/common';

@Injectable()
export class ImageValidatorService {
  // ^ 이미지 체크
  public isImage(mimeType: string): boolean {
    const correctImageTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/heic'];

    return correctImageTypes.includes(mimeType);
  }
}
