import { Module } from '@nestjs/common';
import { SkillsModule } from 'src/skills/skills.module';
import { SkillsService } from 'src/skills/skills.service';
import { UserToSkillResolver } from './userToSkill.resolver';
import { UserToSkillService } from './userToSkills.service';

@Module({
  providers: [UserToSkillResolver, UserToSkillService, SkillsService],
  exports: [UserToSkillService],
  imports: [SkillsModule],
})
export class UserToSkillModule {}
