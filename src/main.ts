import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import helmet from 'helmet';
import env from './config/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet());
  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  const origin =
    process.env.NODE_ENV === 'production' ? [process.env.FRONTEND_URL] : '*';
  app.enableCors({
    origin: origin,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    // preflightContinue: false,
    // optionsSuccessStatus: 204,
  });
  app.enableVersioning({
    type: VersioningType.URI,
  });
  const config = new DocumentBuilder()
    .setTitle('NestJS Backend Template')
    .setDescription('This is NestJS Backend Template')
    .addTag('user')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  if (env().NODE_ENV === 'development')
    SwaggerModule.setup('api', app, document);
  await app.listen(env().PORT);
}

bootstrap();
