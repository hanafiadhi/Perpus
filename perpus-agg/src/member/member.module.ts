import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { RmqModule } from 'src/providers/queue/rabbitmq/rmq.module';
import { PERPUS_SERVICE } from 'src/common/constants/services';

@Module({
  imports: [RmqModule.register({ name: PERPUS_SERVICE })],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
