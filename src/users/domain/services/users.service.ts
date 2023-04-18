import { Inject, Injectable } from '@nestjs/common';
import { UserRepository } from '../contracts/repositories/user-repository';
import { User } from '../entities/user.entitiy';

@Injectable()
export class UsersService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  async find(): Promise<User[]> {
    return await this.userRepository.find();
  }
}
