import { User } from '../../entities/user.entitiy';

export interface UserRepository {
  create({ user }: { user: User }): Promise<User>;
  findOne({ userId }: { userId: string }): Promise<User>;
}

export const UserRepository = Symbol('UserRepository');
