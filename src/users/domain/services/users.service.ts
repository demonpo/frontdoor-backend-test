import { Inject, Injectable } from '@nestjs/common';
import { NotFoundError } from '@prometeo-dev/error-handler-library/dist/errors';
import { UserRepository } from '../contracts/repositories/user-repository';
import { User } from '../entities/user.entity';

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
    if (!user) throw new NotFoundError({ message: 'User not found' });

    return user;
  }

  async findOneByEmail({ email }: { email: string }): Promise<User> {
    const user = await this.userRepository.findOneByEmail({ email });
    if (!user) throw new NotFoundError({ message: 'User not found' });

    return user;
  }

  async updateRefreshToken({
    user,
    refreshToken,
  }: {
    user: User;
    refreshToken: string;
  }): Promise<User> {
    return await this.userRepository.update({
      currentUser: user,
      partialUser: { refreshToken },
    });
  }
}
