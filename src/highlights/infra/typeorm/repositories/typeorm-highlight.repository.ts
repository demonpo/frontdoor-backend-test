import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { HighlightRepository } from '../../../domain/contracts/repositories';
import { HighlightEntity } from '../entities';
import { Highlight } from '../../../domain/entities';
import { HighlightMapper } from '../mappers';

@Injectable()
export class TypeOrmHighlightRepository implements HighlightRepository {
  constructor(
    @InjectRepository(HighlightEntity)
    private readonly repository: Repository<HighlightEntity>,
  ) {}
  async findByUser({ userId }: { userId: string }): Promise<Highlight[]> {
    const highlights = await this.repository.find({
      where: { userId: new ObjectID(userId) },
    });
    return HighlightMapper.toDomains(highlights);
  }

  async create({ highlight }: { highlight: Highlight }): Promise<Highlight> {
    const highlightEntity = HighlightMapper.toEntity(highlight);
    highlightEntity.createdAt = new Date();
    const createdHighlight = await this.repository.save(highlightEntity);
    return HighlightMapper.toDomain(createdHighlight);
  }
}
