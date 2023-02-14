import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { IPerson } from 'src/interfaces/IUser';

interface PeopleResults {
  users: IPerson[]
}

@Injectable({
  providedIn: 'root',
})
export class PeopleService {
  constructor(private router: Router, private apollo: Apollo) {}

  getPeople(): QueryRef<PeopleResults>{
    return this.apollo.watchQuery<PeopleResults>({
      query: gql`
        {
          users {
            email
            firstName
            lastName
            id
          }
        }
      `,
    });
  }
}
