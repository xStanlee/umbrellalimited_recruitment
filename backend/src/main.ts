import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  // have to add cors: true to allow frontend to connect to backend
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  // configure swagger
  const config = new DocumentBuilder()
      .setTitle('Umbrella Limited test backend')
      .setDescription('Backend API for fronted recruitment task')
      .setVersion('1.0')
      .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
}
bootstrap();
