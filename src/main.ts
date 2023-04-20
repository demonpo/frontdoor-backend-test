import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes';
import { ExceptionHandlerFilter } from './shared/infra/filters';
import { BadRequestError } from '@prometeo-dev/error-handler-library/dist/errors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: () => {
        return new BadRequestError();
      },
    }),
  );
  app.useGlobalFilters(new ExceptionHandlerFilter());
  await import('./events/producer');
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
