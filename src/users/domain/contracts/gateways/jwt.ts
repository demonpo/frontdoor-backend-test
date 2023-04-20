import { TokenData, Tokens, User } from '../../entities';

export interface JWTGenerator {
  generateTokens(user: User): Tokens;
  decode(token: string): TokenData;
}

export const JWTGenerator = Symbol('JWTGenerator');
