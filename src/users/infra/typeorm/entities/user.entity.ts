import { Entity, Column, ObjectIdColumn, ObjectID, Index } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @ObjectIdColumn()
  _id!: ObjectID;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  @Index('email_idx', { unique: true })
  email!: string;

  @Column({ name: 'password', nullable: false })
  password!: string;

  @Column({ name: 'refreshToken', nullable: false })
  refreshToken?: string;
}
