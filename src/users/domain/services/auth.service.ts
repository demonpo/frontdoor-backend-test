import { Inject, Injectable } from '@nestjs/common';
import {
  ForbiddenError,
  HttpBaseError,
} from '@prometeo-dev/error-handler-library/dist/errors';
import { HashGenerator } from '../contracts/gateways/hash';
import { JWTGenerator } from '../contracts/gateways/jwt';
import { Tokens } from '../entities/tokens.entity';
import { UsersService } from './users.service';
import { User } from '../entities';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,
    @Inject(HashGenerator)
    private readonly hashGenerator: HashGenerator,
    @Inject(JWTGenerator)
    private readonly jwtGenerator: JWTGenerator,
  ) {}

  async register({ user }: { user: User }): Promise<void> {
    try {
      user.password = await this.hashGenerator.generate({
        input: user.password,
      });
      await this.userService.create({ user });
    } catch (e) {
      if (e.code === 11000)
        throw new HttpBaseError({ message: 'Email already exists' });
      throw new HttpBaseError();
    }
  }

  async login({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<Tokens> {
    const user = await this.userService.findOneByEmail({ email });

    const isValid = await this.hashGenerator.validate({
      input: password,
      storedHash: user.password,
    });
    if (!isValid)
      throw new ForbiddenError({ message: 'Password is not correct' });

    const tokens = await this.createTokens({ user });
    return tokens;
  }

  async logout({ userId }: { userId: string }): Promise<void> {
    const user = await this.userService.findOne({ userId });
    await this.userService.updateRefreshToken({ user, refreshToken: null });
  }

  async refreshTokens({
    refreshToken,
  }: {
    refreshToken: string;
  }): Promise<Tokens> {
    const userInfo = this.jwtGenerator.decode(refreshToken);
    const user = await this.userService.findOne({ userId: userInfo.sub });
    if (!user.refreshToken) throw new ForbiddenError();

    const rtValid = await this.hashGenerator.validate({
      input: refreshToken,
      storedHash: user.refreshToken,
    });
    if (!rtValid) throw new ForbiddenError();

    return await this.createTokens({ user });
  }

  private async createTokens({ user }: { user: User }): Promise<Tokens> {
    const tokens = this.jwtGenerator.generateTokens(user);
    const refreshToken = await this.hashGenerator.generate({
      input: tokens.refreshToken,
    });
    await this.userService.updateRefreshToken({ user, refreshToken });
    return tokens;
  }
}
