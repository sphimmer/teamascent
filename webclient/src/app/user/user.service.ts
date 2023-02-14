import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Me, MeResult } from 'src/interfaces/Me';
import { IMySkills, ISkillsResult, IUserSkill } from 'src/interfaces/Skills';
import { meQuery } from '../graphql/me';

interface AddSkillResult {
  addSkill: IUserSkill;
}

interface RemoveSkillResult {
  removeSkillFromUser: {
    status: string;
    message: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router, private apollo: Apollo) {}
  me?: Me;
  getUser(): QueryRef<MeResult> {
    return this.apollo.watchQuery<MeResult>({
      query: meQuery,
    });
  }

  searchSkills(searchWord: string): QueryRef<ISkillsResult> {
    const searchSkills = gql`
      query searchSkills($name: String!) {
        skills(name: $name) {
          id
          name
        }
      }
    `;

    return this.apollo.watchQuery<ISkillsResult>({
      query: searchSkills,
      variables: {
        name: searchWord,
      },
    });
  }

  getMySkills(cache: boolean = true) {
    const getSkills = gql`
      {
        me {
          skills {
            userToSkillId
            competencyLevel
            skill {
              id
              name
            }
          }
        }
      }
    `;

    return this.apollo.watchQuery<IMySkills>({
      query: getSkills,
      fetchPolicy: cache ? 'cache-first' : 'no-cache',
    });
  }

  removeSkill(id: number) {
    const mut = gql`
      mutation ($id: Int!) {
        removeSkillFromUser(userToSkillId: $id) {
          status
          message
        }
      }
    `;

    return this.apollo.mutate<RemoveSkillResult>({
      mutation: mut,
      variables: {
        id: id,
      },
    });
  }

  addSkill(skillId: number, level: number) {
    const mut = gql`
      mutation ($skillId: Int!, $level: Int!) {
        addSkill(addSkillData: { skillId: $skillId, competencyLevel: $level }) {
          skill {
            id
            name
          }
          userToSkillId
          competencyLevel
        }
      }
    `;

    return this.apollo.mutate<AddSkillResult>({
      mutation: mut,
      variables: {
        skillId,
        level,
      },
    });
  }

  updateSkill(userSkillId: number, level: number) {
    const mut = gql`
      mutation ($userSkillId: Int!, $level: Int!) {
        updateUserSkill(
          updateData: { competencyLevel: $level, userToSkillId: $userSkillId }
        ) {
          competencyLevel
          userToSkillId
          skill {
            id
            name
          }
        }
      }
    `;

    return this.apollo.mutate<IUserSkill>({
      mutation: mut,
      variables: {
        userSkillId: userSkillId,
        level
      }
    })
  }
}
