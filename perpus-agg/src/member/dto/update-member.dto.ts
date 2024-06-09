import { PartialType } from '@nestjs/mapped-types';
import { MemberDto } from './create-member.dto';

import { PartialType as Partial } from '@nestjs/swagger';

export class UpdateMemberDto extends PartialType(MemberDto) {}
export class UpdateMemberBody extends Partial(MemberDto) {}
