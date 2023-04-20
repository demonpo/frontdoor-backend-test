import { UserRepository } from '../../../domain/contracts/repositories/user-repository';
import { UserEntity } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectID } from 'mongodb';
import { Injectable } from '@nestjs/common';
import { User } from '../../../domain/entities/user.entity';
import { UserMapper } from '../mappers';

@Injectable()
export class TypeOrmUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async create({ user }: { user: User }): Promise<User> {
    const userEntity = UserMapper.toEntity(user);
    const createdUser = await this.repository.save(userEntity);
    return UserMapper.toDomain(createdUser);
  }

  async findOne({ userId }: { userId: string }): Promise<User> {
    const userEntity = await this.repository.findOne({
      where: { _id: new ObjectID(userId) },
    });
    if (!userEntity) return;

    return UserMapper.toDomain(userEntity);
  }

  async findOneByEmail({ email }: { email: string }): Promise<User> {
    const userEntity = await this.repository.findOne({
      where: { email },
    });
    if (!userEntity) return;

    return UserMapper.toDomain(userEntity);
  }

  async update({
    currentUser,
    partialUser,
  }: {
    currentUser: User;
    partialUser: Partial<User>;
  }): Promise<User> {
    const userEntity = UserMapper.toEntity(currentUser);
    this.repository.merge(userEntity, partialUser);
    const updatedUser = await this.repository.save(userEntity);
    return UserMapper.toDomain(updatedUser);
  }
}
