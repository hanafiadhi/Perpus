import { Member, MemberDocument } from './schema/member.schema';
import { InjectModel } from '@nestjs/mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';

import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { RpcException } from '@nestjs/microservices';
import { APIFeatures } from '../common/utils/apiFeatures';
import mongoose from 'mongoose';

@Injectable()
export class MemberService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: SoftDeleteModel<MemberDocument>,
  ) {}

  async create(payload: any) {
    try {
      return await this.memberModel.create(payload);
    } catch (error) {
      if (error.code === 11000) {
        const duplicateKey = error.keyValue
          ? Object.keys(error.keyValue)[0]
          : '';
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `${duplicateKey} sudah digunakan`,
        });
      }
    }
  }
  async findAll(queryString: any): Promise<any> {
    try {
      const features = new APIFeatures(this.memberModel.find(), queryString)
        .filter()
        .sorting()
        .limitFields();

      const totalItems = await this.memberModel.countDocuments(
        JSON.parse(features.filterData),
      );
      const result = await features.pagination();
      const reportData = {
        paging: {
          page: features.page,
          size: features.limit,
          totalItems: totalItems,
          totalPages: Math.ceil(totalItems / features.limit),
        },
        data: result,
      };

      return reportData;
    } catch (error) {
      console.error(error);
      if (error instanceof mongoose.Error) {
        console.error('Mongoose Error:', error.message, error.name);
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `Silahkan cek query anda`,
        });
      }
      console.error('Non-Mongoose Error:', error.message);
      throw new RpcException({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: `Silahkan cek query anda`,
      }); // Re-throw the error for proper handling
    }
  }

  async get(payload: string) {
    return await this.memberModel.findOne({ _id: payload });
  }

  async delete(memberId: string) {
    const deleteUser = await this.memberModel.softDelete({
      _id: memberId,
    });
    return deleteUser;
  }

  async update(payload: any) {
    const data = payload.data;
    console.log(data);

    try {
      const updateUser = await this.memberModel.findOneAndUpdate(
        {
          _id: payload.memberId,
        },
        data,
        {
          new: true,
        },
      );

      if (!updateUser) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `member dengan ID ${payload.memberId} tidak di temukan`,
        });
      }
      return updateUser;
    } catch (error) {
      // mongoose.Error

      if (error.code === 11000) {
        const duplicateKey = error.keyValue
          ? Object.keys(error.keyValue)[0]
          : '';
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `${duplicateKey} sudah digunakan`,
        });
      }
      throw error;
    }
  }
}
