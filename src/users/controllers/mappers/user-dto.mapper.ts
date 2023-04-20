import { User } from 'src/users/domain/entities';
import { RegisterDto, UserResponse } from '../dtos';

export class UserDtoMapper {
  public static registerDtoToDomain(registerDto: RegisterDto) {
    return new User(registerDto);
  }

  public static toResponse(user: User): UserResponse {
    const response = {
      id: user.id,
      email: user.email,
    };
    return response;
  }
}
