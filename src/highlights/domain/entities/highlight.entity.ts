export interface Highlight {
  id?: string;
  userId: string;
  content: string;
  summary: string;
  tags: string[];
  createdAt?: Date;
}
