import compression from 'compression';
import rateLimit from 'express-rate-limit';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { ExpressAdapter, NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/exceptions/http-exception.filter';
import { swaggerSetup } from './common/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, new ExpressAdapter());
  const configService = app.get(ConfigService);

  //* 서버 추가 세팅
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15분
      max: 100, // 15분 내 같은 IP에서 100회 요청 제한 ( 과금 차단 )
    }),
  );
  app.use(compression());

  //* 필터 설정
  app.useGlobalFilters(new HttpExceptionFilter());

  //* 스웨거 설정
  swaggerSetup(app);

  //* 파이프 설정
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, //? 명시해둔 타입에 맞게 자동 변환
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const port = configService.get('PORT') || 3000;
  await app.listen(port);
  Logger.log(`Abroady Server running on ${port} port!`, '✨');
}
bootstrap();
