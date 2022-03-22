import { Module } from '@nestjs/common';
import { SkillsModule } from 'src/skills/skills.module';
import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';

@Module({
  providers: [RolesService, RolesResolver],
  imports: [SkillsModule],
})
export class RolesModule {}
