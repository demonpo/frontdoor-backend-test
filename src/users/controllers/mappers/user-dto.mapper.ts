import { User } from 'src/users/domain/entities';
import { CreateUserDto, UserResponse } from '../dtos';

export class UserDtoMapper {
  public static createDtoToDomain({ dto }: { dto: CreateUserDto }): User {
    return {
      name: dto.name,
      email: dto.email,
    };
  }

  public static toResponse({ user }: { user: User }): UserResponse {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
