import { UserRepository } from '../../../domain/contracts/repositories/user-repository';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserMapper } from '../mappers/user.mapper';
import { User } from '../../../domain/entities/user.entitiy';

@Injectable()
export class ImplUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async find(): Promise<User[]> {
    const users = await this.userRepository.find();
    return UserMapper.toDomains(users);
  }
}
