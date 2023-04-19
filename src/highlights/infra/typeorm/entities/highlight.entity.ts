import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity({ name: 'highlight' })
export class HighlightEntity {
  @ObjectIdColumn()
  _id!: ObjectID;

  @Column({ name: 'userId', type: 'varchar', nullable: false })
  userId!: ObjectID;

  @Column({ name: 'content', type: 'text', nullable: false })
  content!: string;

  @Column({ name: 'summary', type: 'text', nullable: false })
  summary!: string;

  @Column({ name: 'tags', type: 'varchar', length: 100, array: true })
  tags!: string[];

  @Column({ name: 'createdAt', type: 'date', nullable: false })
  createdAt!: Date;
}
