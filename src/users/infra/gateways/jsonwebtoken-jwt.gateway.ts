import { Injectable } from '@nestjs/common';
import { sign, decode } from 'jsonwebtoken';
import { env } from 'src/config/env';
import { JWTGenerator } from 'src/users/domain/contracts/gateways';
import { TokenData, Tokens, User } from 'src/users/domain/entities';

@Injectable()
export class JsonWebTokenJWTGenerator implements JWTGenerator {
  generateTokens(user: User): Tokens {
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }

  decode(token: string): TokenData {
    const userData: TokenData = decode(token) as TokenData;
    return userData;
  }

  private getTokenData(user: User): TokenData {
    const tokenData: TokenData = {
      sub: user.id,
      email: user.email,
      iat: Date.now(),
    };

    return tokenData;
  }

  private generateAccessToken(user: User): string {
    const tokenData = this.getTokenData(user);

    const accessToken = sign(tokenData, env.jwtSecretAccessKey, {
      expiresIn: '15m',
    });
    return accessToken;
  }

  private generateRefreshToken(user: User): string {
    const tokenData = this.getTokenData(user);

    const refreshToken = sign(tokenData, env.jwtSecretRefreshKey, {
      expiresIn: '7d',
    });
    return refreshToken;
  }
}
