import { UserEntity } from '../entities/user.entity';
import { User } from '../../../domain/entities/user.entity';
import { ObjectID } from 'mongodb';

export class UserMapper {
  public static toDomain(userEntity: UserEntity): User {
    return new User({
      ...userEntity,
      id: userEntity._id.toString(),
    });
  }

  public static toDomains(usersEntity: UserEntity[]): User[] {
    const products = new Array<User>();
    usersEntity.forEach((userEntity) => {
      const user = this.toDomain(userEntity);
      products.push(user);
    });
    return products;
  }

  public static toEntity(user: User): UserEntity {
    const userEntity = new UserEntity();
    userEntity._id = new ObjectID(user.id);
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.refreshToken = user.refreshToken;
    return userEntity;
  }
}
