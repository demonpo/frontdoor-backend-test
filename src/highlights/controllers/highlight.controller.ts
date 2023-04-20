import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { HighlightService } from '../domain/services';
import { SummaryService } from '../../shared/domain/services';
import { CreateHighlightDto } from './dtos';
import { HighlightDtoMapper } from './mappers';
import { JWT } from '../../shared/controller/decorators';
import { Highlight } from '../domain/entities';

@Controller('highlight')
export class HighlightController {
  constructor(
    @Inject(SummaryService)
    private readonly summaryService: SummaryService,
    @Inject(HighlightService)
    private readonly highlightService: HighlightService,
  ) {}

  @Get('/')
  async find(@JWT('sub') userId: string) {
    return {
      data: await this.highlightService.findByUser({ userId }),
    };
  }

  @Post('/')
  async create(
    @Body() payload: CreateHighlightDto,
    @JWT('sub') userId: string,
  ) {
    const { summary, tags } = await this.summaryService.generateSummary({
      text: payload.content,
    });
    console.log(userId);
    const highlight: Highlight = {
      userId,
      content: payload.content,
      summary,
      tags,
    };
    const createdHighlight = await this.highlightService.create({ highlight });
    return {
      data: HighlightDtoMapper.toResponse(createdHighlight),
    };
  }
}
