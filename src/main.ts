import { writeFileSync } from 'fs';

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { setupSwagger } from './configuration/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api/v1/');
  setupSwagger(app);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  await app.listen(port || 3000);
  Logger.log(`Application is running onn ${await app.getUrl()}`);

  const server = app.getHttpServer();
  const router = server._events.request._router;

  const routes: Array<{
    path: string;
    method: string;
    parent: string;
    module: string;
  }> = router.stack
    .map((layer) => {
      if (layer.route) {
        return {
          path: layer.route?.path,
          method: layer.route?.stack[0].method.toUpperCase(),
          parent: layer?.route?.path?.replace('/api/v1/', '')?.split('/')[0],
          module: layer?.route?.path?.replace('/api/v1/', '')?.split('/')[1],
        };
      }
    })
    .filter((item) => item !== undefined);

  const obj = {};

  routes.forEach((route) => {
    const { parent, module, path, method } = route;

    if (!obj[parent]) {
      obj[parent] = {};
    }

    if (!obj[parent].hasOwnProperty(module)) {
      obj[parent][module] = [];
    }

    obj[parent][module].push({
      path,
      method,
    });
  });

  writeFileSync('routes.json', JSON.stringify(obj), 'utf-8');
}
bootstrap();
