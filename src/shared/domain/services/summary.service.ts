import { Inject, Injectable } from '@nestjs/common';
import { SummaryGenerator } from '../gateways';

@Injectable()
export class SummaryService {
  constructor(
    @Inject(SummaryGenerator)
    private readonly summaryGenerator: SummaryGenerator,
  ) {}

  async generateSummary({
    text,
  }: {
    text: string;
  }): Promise<{ summary: string; tags: string[] }> {
    return await this.summaryGenerator.generateSummaryAndTagsFromText({ text });
  }
}
