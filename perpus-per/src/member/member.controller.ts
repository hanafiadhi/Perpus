import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly appService: MemberService) {}

  @MessagePattern('create-member')
  async create(@Payload() payload: any): Promise<any> {
    return this.appService.create(payload);
  }

  @MessagePattern('get-member-list')
  async getMemberList(@Payload() payload: any) {
    return this.appService.findAll(payload);
  }

  @MessagePattern('get-member')
  async getOne(@Payload() payload: string): Promise<any> {
    return this.appService.get(payload);
  }

  @MessagePattern('delete-member')
  async delete(@Payload() memberId: string) {
    return this.appService.delete(memberId);
  }

  @MessagePattern('update-member')
  async update(@Payload() payload: any) {
    return await this.appService.update(payload);
  }

  @MessagePattern('nice')
  async nice(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log({
      payload: data,
      ctx: context.getMessage(),
      pattern: context.getPattern(),
    });
  }
}
