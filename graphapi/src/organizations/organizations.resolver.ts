import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Organization } from "./models/organization.model";
import { OrganizationsService } from "./organizations.service";

@Resolver((of: any) => Organization)
export class OrganizationsResolver {
    constructor(private orgService: OrganizationsService) {}

    @Mutation(returns => Organization)
    async createOrganization(@Args('name') name: string) {
        const org = new Organization()
        org.name = name
        return await this.orgService.save(org)
    }

    @Query((returns) => Organization, {name: 'organization'})
    async organization(@Args('id') id: string){
        const org = await this.orgService.findById(id)
        return org
    }

    @Query((returns) => [Organization])
    async organizations(){
        const orgs = await this.orgService.findAll()
        return orgs
    }
}