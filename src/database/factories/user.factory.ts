import { FactorizedAttrs, Factory } from '@jorgebodega/typeorm-seeding';
import { faker } from '@faker-js/faker';
import { UserEntity } from '../../users/infra/typeorm/entities/user.entity';
import { ObjectID } from 'mongodb';

export class UserFactory extends Factory<UserEntity> {
  protected entity = UserEntity;
  protected attrs(): FactorizedAttrs<UserEntity> {
    return {
      _id: new ObjectID(),
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(16),
    };
  }
}
