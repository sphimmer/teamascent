import { gql } from 'apollo-angular';

export const meQuery = gql`
  {
    me {
      email
      id
      firstName
      lastName
      dateOfBirth
      biography
      createdDate
    }
  }
`;
