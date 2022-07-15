import { Injectable } from '@nestjs/common';
import { v1 as uuid } from 'uuid';

@Injectable()
export class GeneratorSerivce {
  public generateUUID(): string {
    return uuid();
  }

  public generateFileName(extension: string): string {
    return this.generateUUID() + '.' + extension;
  }
}
