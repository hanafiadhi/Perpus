import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { UpdateMemberDto } from './dto/update-member.dto';
import { EmptyError, firstValueFrom, lastValueFrom } from 'rxjs';
import { PERPUS_SERVICE } from 'src/common/constants/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';

@Injectable()
export class MemberService {
  constructor(
    @Inject(PERPUS_SERVICE) private readonly clientPepus: ClientProxy,
  ) {}

  async create(createUserDto: any) {
    const member = await firstValueFrom(
      this.clientPepus.send('create-member', createUserDto),
    );
    return member;
  }

  async findAll(payload: any) {
    const getListUser = await firstValueFrom(
      this.clientPepus.send('get-member-list', payload),
    );
    return getListUser;
  }

  async findOne(userId: string) {
    const getMember = await firstValueFrom(
      this.clientPepus.send('get-member', userId),
    );
    if (!getMember) throw new NotFoundException('Data tidak ditemukan');
    return getMember;
  }

  async update(memberId: string, updateMemberDto: UpdateMemberDto) {
    const updateMember = await firstValueFrom(
      this.clientPepus.send('update-member', {
        data: updateMemberDto,
        memberId,
      }),
    );
    return updateMember;
  }

  async remove(memberId: string) {
    const deleteMember = await firstValueFrom(
      this.clientPepus.send('delete-member', memberId),
    );

    if (deleteMember.deleted == 0)
      throw new NotFoundException('Data tidak ditemukan');
  }
}
