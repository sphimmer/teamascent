import { Module } from "@nestjs/common";
import { OrganizationsModule } from "src/organizations/organizations.module";
import { PositionsModule } from "src/positions/postions.module";
import { TeamsResolver } from "./teams.resolver";
import { TeamsService } from "./teams.service";

@Module({
    providers: [TeamsService, TeamsResolver],
    imports: [PositionsModule, OrganizationsModule],
    exports: [TeamsService]
})
export class TeamsModule{}