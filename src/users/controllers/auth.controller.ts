import { Controller, Inject, Post, Body } from '@nestjs/common';
import { AuthService } from '../domain/services/auth.service';
import { UserDtoMapper } from './mappers';
import { LogInDto, RefreshTokenDto, RegisterDto } from './dtos';
import { JWT } from '../../shared/controller/decorators';

@Controller()
export class AuthController {
  constructor(
    @Inject(AuthService)
    private readonly authService: AuthService,
  ) {}

  @Post('/register')
  async register(@Body() payload: RegisterDto) {
    const user = UserDtoMapper.registerDtoToDomain(payload);
    await this.authService.register({ user });
    return {};
  }

  @Post('/login')
  async login(@Body() payload: LogInDto) {
    const { accessToken, refreshToken } = await this.authService.login({
      email: payload.email,
      password: payload.password,
    });
    return { data: { accessToken, refreshToken } };
  }

  @Post('/logout')
  async logout(@JWT('sub') userId: string) {
    await this.authService.logout({ userId });
    return {};
  }

  @Post('/refreshTokens')
  async refreshToken(@Body() payload: RefreshTokenDto) {
    const { accessToken, refreshToken } = await this.authService.refreshTokens({
      refreshToken: payload.refreshToken,
    });
    return { data: { accessToken, refreshToken } };
  }
}
