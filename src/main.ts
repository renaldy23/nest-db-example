import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  ValidationPipe,
  HttpException,
  HttpStatus,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => {
          const messageValue = Object.values(error.constraints);
          const stringMessage = messageValue.filter((value) => typeof value);
          return {
            property: error.property,
            message: stringMessage,
          };
        });
        return new HttpException(
          {
            message: 'Invalid Entity',
            result,
          },
          HttpStatus.BAD_REQUEST,
        );
      },
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(3000);
}
bootstrap();
