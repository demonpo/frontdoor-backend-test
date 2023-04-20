import { Factory, Seeder } from '@jorgebodega/typeorm-seeding';
import { Connection } from 'typeorm';
import { ObjectID } from 'mongodb';
import { UserFactory } from '../factories/user.factory';
import { HighlightFactory } from '../factories/highlight.factory';

export class HighlightTestCreate extends Seeder {
  async run(connection: Connection) {
    const userFactory = new UserFactory();
    const highlightFactory = new HighlightFactory();

    const user = await userFactory.create({
      _id: new ObjectID('64415e38f2450f0127bd039d'),
    });

    await highlightFactory.create({ userId: user._id });
    await highlightFactory.create({ userId: user._id });
    await highlightFactory.create({ userId: user._id });
  }
}
