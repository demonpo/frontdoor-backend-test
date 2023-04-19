import { Module } from '@nestjs/common';
import { ExampleMiddleware } from './infra/middlewares/example.middleware';
import { SummaryGenerator } from './domain/gateways';
import { OpenAISummaryGenerator } from './infra/gateways/openai-summary-generator.gateway';
import { SummaryService } from './domain/services';

@Module({
  providers: [
    ExampleMiddleware,
    {
      provide: SummaryGenerator,
      useClass: OpenAISummaryGenerator,
    },
    SummaryService,
  ],
  exports: [ExampleMiddleware, SummaryService],
})
export class SharedModule {}
