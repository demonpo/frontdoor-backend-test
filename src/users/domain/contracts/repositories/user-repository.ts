import { User } from '../../entities/user.entity';

export interface UserRepository {
  create({ user }: { user: User }): Promise<User>;
  findOne({ userId }: { userId: string }): Promise<User>;
  findOneByEmail({ email }: { email: string }): Promise<User>;
  update({
    currentUser,
    partialUser,
  }: {
    currentUser: User;
    partialUser: Partial<User>;
  }): Promise<User>;
}

export const UserRepository = Symbol('UserRepository');
