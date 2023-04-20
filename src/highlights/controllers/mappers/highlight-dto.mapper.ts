import { Highlight } from '../../domain/entities';
import { HighlightResponse } from '../dtos';

export class HighlightDtoMapper {
  static toResponse(highlight: Highlight): HighlightResponse {
    return {
      id: highlight.id,
      content: highlight.content,
      summary: highlight.summary,
      tags: highlight.tags,
      createdAt: highlight.createdAt.getTime(),
    };
  }
}
