import { Factory, Seeder } from '@jorgebodega/typeorm-seeding';
import { Connection } from 'typeorm';
import { UserFactory } from '../factories/user.factory';

export class UsersCreate extends Seeder {
  async run(connection: Connection) {
    await new UserFactory().createMany(10);
  }
}
