import { Module } from '@nestjs/common';
import { UserToSkillModule } from 'src/userToSkill/userToSkill.module';
import { UserToSkillService } from 'src/userToSkill/userToSkills.service';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService, UserToSkillService],
  imports: [UserToSkillModule],
  exports: [UsersService]
})
export class UsersModule {}
