import { FactorizedAttrs, Factory } from '@jorgebodega/typeorm-seeding';
import { faker } from '@faker-js/faker';
import { ObjectID } from 'mongodb';
import { HighlightEntity } from '../../highlights/infra/typeorm/entities';

export class HighlightFactory extends Factory<HighlightEntity> {
  protected entity = HighlightEntity;
  protected attrs(): FactorizedAttrs<HighlightEntity> {
    return {
      _id: new ObjectID(),
      content: faker.random.words(100),
      summary: faker.random.words(50),
      tags: [faker.random.word(), faker.random.word()],
      createdAt: faker.date.recent(),
    };
  }
}
