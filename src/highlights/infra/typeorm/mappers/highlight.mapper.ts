import { Highlight } from 'src/highlights/domain/entities';
import { HighlightEntity } from '../entities';
import { ObjectID } from 'mongodb';

export class HighlightMapper {
  static toDomain(entity: HighlightEntity): Highlight {
    return {
      id: entity._id.toString(),
      userId: entity.userId.toString(),
      content: entity.content,
      summary: entity.summary,
      tags: entity.tags,
      createdAt: entity.createdAt,
    };
  }

  static toDomains(entities: HighlightEntity[]): Highlight[] {
    return entities.map((entity) => this.toDomain(entity));
  }

  static toEntity(highlight: Highlight): HighlightEntity {
    const entity = new HighlightEntity();
    entity._id = new ObjectID(highlight.id);
    entity.userId = new ObjectID(highlight.userId);
    entity.content = highlight.content;
    entity.summary = highlight.summary;
    entity.tags = highlight.tags;
    entity.createdAt = highlight.createdAt;
    return entity;
  }
}
