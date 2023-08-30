import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const config = new DocumentBuilder()
    .setTitle('VF-Apparel Backend')
    .setDescription('The Virtual Forge challenge made by Raphael diniz')
    .setVersion('1.0')
    .addTag('virtualForge')
    .build();
  const app = await NestFactory.create(AppModule);
  const document = SwaggerModule.createDocument(app, config);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.SERVER_PORT || 3163);
}
bootstrap();
