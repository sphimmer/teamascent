import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field(() => String)
  dateOfBirth: Date;

  @Field()
  password: string;

  @Field()
  organizationId: string;

}

export function validate(user: UserInput): [boolean, string[]]{
  let valid = true
  const errors: string[] = []

  if (!user.firstName || user.firstName == '') {
    valid = false
    errors.push('invalid first name')
  }

  if (!user.lastName || user.lastName == '') {
    valid = false
    errors.push('invalid last name')
  }

  if (!user.email || user.email == '') {
    valid = false
    errors.push('invalid email')
  } 
  
  if (!user.organizationId || user.organizationId == '') {
    valid = false
    errors.push('invalid organization')
  }

  if (!user.password || user.password == '' ) {
    valid = false
    errors.push('invalid password')
  } 

  return [valid, errors]
}
