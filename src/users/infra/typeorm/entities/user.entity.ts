import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ name: 'first_name', nullable: false })
  firstName!: string;

  @Column({ name: 'last_name', nullable: false })
  lastName!: string;

  @Column({ name: 'email', nullable: false })
  email!: string;
}
