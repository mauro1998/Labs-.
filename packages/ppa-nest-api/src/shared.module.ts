import { Module } from '@nestjs/common';
import { SessionModule } from './session/session.module';
import { UserModule } from './user/user.module';
import { RoundActionModule } from './round-action/round-action.module';
import { RoundModule } from './round/round.module';

@Module({
  imports: [SessionModule, UserModule, RoundModule, RoundActionModule],
  exports: [SessionModule, UserModule, RoundModule, RoundActionModule],
})
export class SharedModule {}
