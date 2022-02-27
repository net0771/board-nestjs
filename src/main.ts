import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  await app.listen(process.env.PORT);
  console.log(`server listening on port ${process.env.PORT}`);
  app.useGlobalPipes(new ValidationPipe());
}
bootstrap();
