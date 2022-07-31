import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { ApiConfigService } from 'src/config/services/api-config.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [AuthService, ApiConfigService, JwtService, JwtStrategy, ConfigService],
  exports: [],
})
export class AuthModule {}
