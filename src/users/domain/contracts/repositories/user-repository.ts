import { User } from '../../entities/user.entitiy';

export interface UserRepository {
  find(): Promise<User[]>;
}

export const UserRepository = Symbol('UserRepository');
