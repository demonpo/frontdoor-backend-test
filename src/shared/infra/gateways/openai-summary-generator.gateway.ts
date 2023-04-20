import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi } from 'openai';
import { SummaryGenerator } from '../../domain/gateways';

@Injectable()
export class OpenAISummaryGenerator implements SummaryGenerator {
  MAX_WORDS = 200;

  configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  openai = new OpenAIApi(this.configuration);

  async generateSummaryAndTagsFromText({
    text,
  }: {
    text: string;
  }): Promise<{ summary: string; tags: string[] }> {
    const summaryPromise = this.summaryCompletion(text);
    const tagsPromise = this.tagsCompletion(text);

    const [summaryCompletion, tagsCompletion] = await Promise.all([
      summaryPromise,
      tagsPromise,
    ]);

    return {
      summary: this.cleanSummary(summaryCompletion.data.choices[0].text),
      tags: this.getTagsArray(tagsCompletion.data.choices[0].text),
    };
  }

  private summaryCompletion(text: string) {
    const numberOfWordsInText = this.countWords(text);
    const maxTokens =
      numberOfWordsInText > this.MAX_WORDS
        ? this.getMaxTokens(this.MAX_WORDS)
        : this.getMaxTokens(numberOfWordsInText);

    return this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Summarize this in less or equal than ${maxTokens.toString()} GPT-3 tokens: ${text}`,
      temperature: 0.5,
      max_tokens: maxTokens,
      n: 1,
      stop: null,
    });
  }

  // Write between two and five key words related to the text. Do not repeat the tags. The text is: ${text}
  private tagsCompletion(text: string) {
    return this.openai.createCompletion({
      model: 'text-davinci-003',
      prompt: `Extract two or three keywords (keyword can only be 1 word) in an ordered list from this text: ${text} ----END----`,
      temperature: 0.5,
      top_p: 1,
      frequency_penalty: 0.8,
      presence_penalty: 0,
      max_tokens: this.getMaxTokens(100),
      n: 1,
      stop: '4',
    });
  }

  private getTagsArray(tags: string): string[] {
    const cleanedTags = this.cleanTags(tags);
    const tagsArray = cleanedTags.split('\n');
    return tagsArray
      .map((tag) => this.capitalize(tag.trim()))
      .filter((tag) => tag !== '');
  }

  private getMaxTokens(numberOfWords: number) {
    // each GPT-3 token equal aprox. to 0.75 of an english word
    // where 1 token equal aprox. 4 letters
    return Math.round(numberOfWords / 0.75);
  }

  private countWords(text: string): number {
    text = text.toLowerCase();
    text = text.replace(/[^0-9a-z ]/gi, '');
    const words = text.split(' ');
    return words.length;
  }

  private cleanSummary(text: string): string {
    const cleanText = text.replace(/\n\n/g, '');
    return cleanText;
  }

  private cleanTags(tags: string): string {
    const cleanText = tags.replace(/\d+\./g, '');
    return cleanText;
  }

  private capitalize(text: string): string {
    const words = text.split(' ');
    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }
    return words.join(' ');
  }
}
