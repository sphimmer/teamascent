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

  validate(): [boolean, string[]]{
    let valid = true
    const errors: string[] = []

    if (!this.firstName || this.firstName == '') {
      valid = false
      errors.push('invalid first name')
    }

    if (!this.lastName || this.lastName == '') {
      valid = false
      errors.push('invalid last name')
    }

    if (!this.email || this.email == '') {
      valid = false
      errors.push('invalid email')
    } 
    
    if (!this.organizationId || this.organizationId == '') {
      valid = false
      errors.push('invalid organization')
    }

    if (!this.password || this.password == '' ) {
      valid = false
      errors.push('invalid password')
    } 

    return [valid, errors]
  }
}
