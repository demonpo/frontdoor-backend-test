import { Module } from '@nestjs/common';
import { ExampleMiddleware } from './infra/middlewares/example.middleware';

@Module({
  providers: [ExampleMiddleware],
  exports: [ExampleMiddleware],
})
export class SharedModule {}
