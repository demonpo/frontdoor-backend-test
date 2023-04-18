import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExceptionHandlerFilter } from './shared/infra/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new ExceptionHandlerFilter());
  await import('./events/producer');
  await app.listen(3000);
}
bootstrap();
