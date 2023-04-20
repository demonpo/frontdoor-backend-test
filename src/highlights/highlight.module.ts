import { Module, MiddlewareConsumer } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HighlightEntity } from './infra/typeorm/entities';
import { HighlightRepository } from './domain/contracts/repositories';
import { TypeOrmHighlightRepository } from './infra/typeorm/repositories';
import { HighlightService } from './domain/services';
import { HighlightController } from './controllers/highlight.controller';
import JwtHandler from '../shared/infra/middlewares/jwt-handler.middleware';

@Module({
  imports: [TypeOrmModule.forFeature([HighlightEntity]), SharedModule],
  providers: [
    {
      provide: HighlightRepository,
      useClass: TypeOrmHighlightRepository,
    },
    HighlightService,
  ],
  controllers: [HighlightController],
  exports: [HighlightService],
})
export class HighlightModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(JwtHandler()).forRoutes(HighlightController);
  }
}
