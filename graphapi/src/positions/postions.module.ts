import { Module } from '@nestjs/common';
import { RolesModule } from 'src/roles/roles.module';
import { PositionsResolver } from './positions.resolver';
import { PositionsService } from './positions.service';

@Module({
  providers: [PositionsService, PositionsResolver],
  imports: [RolesModule],
  exports: [PositionsService]
})
export class PositionsModule {}
