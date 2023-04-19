import { Inject, Injectable } from '@nestjs/common';
import { NotFoundError } from '@prometeo-dev/error-handler-library/dist/errors';
import { UserRepository } from '../contracts/repositories/user-repository';
import { User } from '../entities/user.entitiy';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async create({ user }: { user: User }): Promise<User> {
    return await this.userRepository.create({ user });
  }

  async findOne({ userId }: { userId: string }): Promise<User> {
    const user = await this.userRepository.findOne({ userId });
    if (!user) throw new NotFoundError({ message: 'Product not found' });

    return user;
  }
}
