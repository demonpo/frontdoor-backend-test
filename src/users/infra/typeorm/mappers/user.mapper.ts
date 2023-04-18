import { UserEntity } from '../entities/user.entity';
import { User } from '../../../domain/entities/user.entitiy';

export class UserMapper {
  public static toDomain(userEntity: UserEntity): User {
    return new User(userEntity);
  }

  public static toDomains(usersEntity: UserEntity[]): User[] {
    const products = new Array<User>();
    usersEntity.forEach((userEntity) => {
      const user = this.toDomain(userEntity);
      products.push(user);
    });
    return products;
  }
}
