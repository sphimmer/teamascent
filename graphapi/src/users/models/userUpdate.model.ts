import { Field, InputType } from "@nestjs/graphql";

@InputType()

export class UpdateUser {

  @Field({nullable:true})
  firstName: string;

  @Field({nullable:true})
  lastName: string;

  @Field({nullable:true})
  email: string;

  @Field(() => String, {nullable:true})
  dateOfBirth: Date;

  @Field({ nullable: true })
  biography: string;
}
