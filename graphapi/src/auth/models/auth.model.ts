import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { User } from "src/users/models/user.model";

@ObjectType()
export class LoginResponse{
    @Field()
    access_token: string;

    @Field()
    user: User
}

@InputType()
export class LoginInput{
    @Field()
    email: string

    @Field()
    password: string
}