import { Module } from '@nestjs/common';
import { UserToSkillModule } from 'src/UserToSkill/userToSkill.module';
import { UserToSkillService } from 'src/UserToSkill/userToSkills.service';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService, UserToSkillService],
  imports: [UserToSkillModule],
})
export class UsersModule {}
