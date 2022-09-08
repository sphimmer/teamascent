import { Module } from "@nestjs/common";
import { PositionsModule } from "src/positions/postions.module";
import { TeamsResolver } from "./teams.resolver";
import { TeamsService } from "./teams.service";

@Module({
    providers: [TeamsService, TeamsResolver],
    imports: [PositionsModule],
    exports: [TeamsService]
})
export class TeamsModule{}