import { Controller, Get, Post, Body, Inject } from '@nestjs/common';
import { UsersService } from '../domain/services/users.service';
import { JWT } from 'src/shared/controller/decorators';
import { CreateUserDto } from './dtos';
import { UserDtoMapper } from './mappers';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,
  ) {}

  @Post('/')
  async create(@Body() payload: CreateUserDto) {
    const user = UserDtoMapper.createDtoToDomain({ dto: payload });
    const createdUser = await this.userService.create({
      user,
    });
    const response = UserDtoMapper.toResponse({ user: createdUser });
    return { data: response };
  }

  @Get('/')
  async get(@JWT('sub') userId: string) {
    const user = await this.userService.findOne({
      userId,
    });
    const response = UserDtoMapper.toResponse({ user });
    return { data: response };
  }
}
