import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field((type) => String)
  dateOfBirth: Date;

  @Field()
  password: string;
}
