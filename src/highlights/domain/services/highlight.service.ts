import { Inject, Injectable } from '@nestjs/common';
import { HighlightRepository } from '../contracts/repositories';
import { Highlight } from '../entities';

@Injectable()
export class HighlightService {
  constructor(
    @Inject(HighlightRepository)
    private readonly highlightRepository: HighlightRepository,
  ) {}

  async findByUser({ userId }: { userId: string }): Promise<Highlight[]> {
    return await this.highlightRepository.findByUser({ userId });
  }

  async create({ highlight }: { highlight: Highlight }): Promise<Highlight> {
    return await this.highlightRepository.create({ highlight });
  }
}
