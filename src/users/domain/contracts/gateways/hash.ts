export interface HashGenerator {
  generate({ input }: { input: string }): Promise<string>;
  validate({
    input,
    storedHash,
  }: {
    input: string;
    storedHash: string;
  }): Promise<boolean>;
}

export const HashGenerator = Symbol('HashGenerator');
