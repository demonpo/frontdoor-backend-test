import { Highlight } from '../../entities';

export interface HighlightRepository {
  findByUser({ userId }: { userId: string }): Promise<Highlight[]>;
  create({ highlight }: { highlight: Highlight }): Promise<Highlight>;
}

export const HighlightRepository = Symbol('HighlightRepository');
