import { FactorizedAttrs, Factory } from '@jorgebodega/typeorm-seeding';
import { faker } from '@faker-js/faker';
import { UserEntity } from '../../users/infra/typeorm/entities/user.entity';
import { ObjectID } from 'mongodb';

export class UserFactory extends Factory<UserEntity> {
  protected entity = UserEntity;
  protected attrs(): FactorizedAttrs<UserEntity> {
    return {
      _id: new ObjectID(faker.datatype.hexadecimal(24)),
      name: faker.name.fullName(),
      email: faker.internet.email(),
    };
  }
}
