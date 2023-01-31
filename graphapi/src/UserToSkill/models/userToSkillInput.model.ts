
import { Optional } from '@nestjs/common';
import { Field, InputType, Int } from '@nestjs/graphql';


@InputType()
export class UserToSkillInput {
  @Field({nullable: true})
  userId?: string;

  @Field(() => Int)
  skillId!: number;

  @Field(() => Int)
  competencyLevel: number;
}

@InputType()
export class UserToSkillUpdateInput {
  @Field(() => Int)
  userToSkillId: number;

  @Field(() => Int)
  competencyLevel: number;
}