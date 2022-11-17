import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import { GqlAuthGuard } from 'src/auth/gql-auth.guard';
import { DecodedJwt } from 'src/auth/models/auth.model';
import { User } from 'src/users/models/user.model';
import { Organization } from './models/organization.model';
import { OrganizationsService } from './organizations.service';

@Resolver((of: any) => Organization)
export class OrganizationsResolver {
  constructor(private orgService: OrganizationsService) {}

  @Mutation((returns) => Organization)
  @UseGuards(GqlAuthGuard)
  async createOrganization(@Args('name') name: string) {
    const org = new Organization();
    org.name = name;
    return await this.orgService.save(org);
  }

  @Query((returns) => Organization, { name: 'organization' })
  @UseGuards(GqlAuthGuard)
  async organization(@CurrentUser() user: DecodedJwt) {
    const org = await this.orgService.findById(user.organizationId);
    return org;
  }

  @Query((returns) => [Organization])
  @UseGuards(GqlAuthGuard)
  async organizations() {
    const orgs = await this.orgService.findAll();
    return orgs;
  }
}
