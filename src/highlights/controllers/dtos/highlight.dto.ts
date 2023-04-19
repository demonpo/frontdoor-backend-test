export interface CreateHighlightDto {
  content: string;
}

export interface HighlightResponse {
  id: string;
  content: string;
  summary: string;
  tags: string[];
  createdAt: number;
}
