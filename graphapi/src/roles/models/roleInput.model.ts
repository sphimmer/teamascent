import { InputType, Field, Int } from '@nestjs/graphql';
import { Role } from './role.model';

@InputType()
export class RoleInput extends Role {
  @Field({nullable: true})
  title: string;

  @Field({nullable: true})
  description: string;

  @Field({nullable: true})
  responsibilities: string;

  @Field(() => [Int], { nullable: true })
  skillIds: number[];
}
