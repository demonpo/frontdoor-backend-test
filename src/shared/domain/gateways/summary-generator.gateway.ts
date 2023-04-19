export interface SummaryGenerator {
  generateSummaryAndTagsFromText({
    text,
  }: {
    text: string;
  }): Promise<SummaryOutput>;
}

type SummaryOutput = {
  summary: string;
  tags: string[];
};

export const SummaryGenerator = Symbol('SummaryGenerator');
