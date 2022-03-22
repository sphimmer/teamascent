import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserToSkill } from 'src/userToSkill/models/userToSkill.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column()
  firstName: string;

  @Field()
  @Column()
  lastName: string;

  @Field()
  @Column()
  email: string;

  @Field(() => String)
  @Column()
  dateOfBirth: Date;

  @Field({ nullable: true })
  @Column({ nullable: true })
  biography: string;

  @Field(() => [UserToSkill])
  @OneToMany(() => UserToSkill, (uts) => uts.user)
  skills: UserToSkill;

  @Column()
  password: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;
}
