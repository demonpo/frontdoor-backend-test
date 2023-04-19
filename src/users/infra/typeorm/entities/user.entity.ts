import { Entity, Column, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @ObjectIdColumn()
  _id!: ObjectID;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name!: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false })
  email!: string;
}
