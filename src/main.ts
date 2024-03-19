import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';



async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
  .setTitle('Crud')
  .setDescription('Crud de usuario')
  .setVersion('1.0.0')
  .build();
  const document = SwaggerModule.createDocument(app,options);
  SwaggerModule.setup('/api/docs',app,document);


  await app.listen(3000);
}
bootstrap();
