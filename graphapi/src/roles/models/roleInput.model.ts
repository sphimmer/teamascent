import { InputType, Field, Int } from '@nestjs/graphql';
import { Role } from './role.model';

@InputType()
export class RoleInput extends Role {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  responsibilities: string;

  @Field(() => [Int], { nullable: true })
  skillIds: number[];
}
