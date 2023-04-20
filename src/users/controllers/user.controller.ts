import { Controller, Get, Inject } from '@nestjs/common';
import { UsersService } from '../domain/services/users.service';
import { JWT } from 'src/shared/controller/decorators';
import { UserDtoMapper } from './mappers';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,
  ) {}

  @Get('/')
  async get(@JWT('sub') userId: string) {
    const user = await this.userService.findOne({
      userId,
    });
    const response = UserDtoMapper.toResponse(user);
    return { data: response };
  }
}
