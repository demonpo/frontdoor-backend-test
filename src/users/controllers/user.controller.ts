import { Controller, Get, Inject } from '@nestjs/common';
import { UsersService } from '../domain/services/users.service';

@Controller()
export class UserController {
  constructor(
    @Inject(UsersService)
    private readonly usersService: UsersService,
  ) {}

  @Get('/test')
  async test() {
    return { message: 'test2' };
  }

  @Get('/users')
  async findAll() {
    return {
      data: await this.usersService.find(),
    };
  }
}
