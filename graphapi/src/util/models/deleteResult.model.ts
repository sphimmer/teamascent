import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class DeleteResult {
  @Field()
  message: string;

  @Field()
  status: 'SUCCESS' | 'FAILED';
}
