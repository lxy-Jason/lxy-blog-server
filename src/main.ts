import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { knife4jSetup } from 'nest-knife4j';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('lxy-blog-api')
    .setDescription('博客接口文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  knife4jSetup(app, [
    {
      name: '1.X版本',
      url: `/api-json`,
      swaggerVersion: '1.0',
      location: `/api-json`,
    },
  ]);
  await app.listen(3667);
  console.log('文档地址:' + `http://localhost:3667/doc.html#/home`);
}

bootstrap();
