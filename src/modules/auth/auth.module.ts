import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiConfigService } from 'src/config/services/api-config.service';
import { AwsS3Service } from 'src/config/services/aws-s3.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ApiConfigService, JwtService, JwtStrategy, AwsS3Service],
  exports: [],
})
export class AuthModule {}
