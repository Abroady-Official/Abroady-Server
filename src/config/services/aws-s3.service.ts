import { BadRequestException, Injectable } from '@nestjs/common';
import { ApiConfigService } from './api-config.service';
import * as AWS from 'aws-sdk';
import { nanoid } from 'nanoid';
import { rm } from 'src/common/constants';
import { ImageValidatorService } from './image-validator.service';

@Injectable()
export class AwsS3Service {
  private readonly s3 = new AWS.S3({
    credentials: {
      accessKeyId: this.configService.awsS3Config.bucketAccessKey,
      secretAccessKey: this.configService.awsS3Config.bucketSecretKey,
    },
  });

  constructor(
    private readonly configService: ApiConfigService,
    private readonly imageValidatorService: ImageValidatorService,
  ) {}

  async uploadFile(file: Express.MulterS3.File) {
    if (!this.imageValidatorService.isImage(file.mimetype)) throw new BadRequestException(rm.NO_IMAGE_TYPE);
    return await this.upload(file.buffer, this.configService.awsS3Config.bucket, file.mimetype);
  }

  private async upload(file: Buffer, bucket: string, mimeType: string) {
    const params = {
      Bucket: bucket,
      Key: `profile/${Date.now()}_${nanoid()}`,
      Body: file,
      ACL: 'public-read',
      ContentType: mimeType,
      ContentDisposition: 'inline',
      CreateBucketConfiguration: {
        LocationConstraint: this.configService.awsS3Config.bucketRegion,
      },
    };

    try {
      const { Location } = await this.s3.upload(params).promise();
      return Location;
    } catch (error) {
      console.error(error);
    }
  }
}
