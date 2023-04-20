import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHighlightDto {
  @IsNotEmpty()
  @IsString()
  content: string;
}

export interface HighlightResponse {
  id: string;
  content: string;
  summary: string;
  tags: string[];
  createdAt: number;
}
