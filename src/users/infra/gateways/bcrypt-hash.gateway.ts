import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { HashGenerator } from 'src/users/domain/contracts/gateways';

@Injectable()
export class BCryptHashGenerator implements HashGenerator {
  async generate({ input }: { input: string }): Promise<string> {
    const saltRounds = 10;
    const hashedInput: string = await hash(input, saltRounds);
    return hashedInput;
  }

  async validate({
    input,
    storedHash,
  }: {
    input: string;
    storedHash: string;
  }): Promise<boolean> {
    const result: boolean = await compare(input, storedHash);
    return result;
  }
}
