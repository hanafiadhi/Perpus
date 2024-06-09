import { InjectModel } from '@nestjs/mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';

import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { RpcException } from '@nestjs/microservices';
import { APIFeatures } from '../common/utils/apiFeatures';
import mongoose from 'mongoose';
import { Book, BookDocument } from './schema/books.schema';
import { Member, MemberDocument } from '../member/schema/member.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: SoftDeleteModel<MemberDocument>,
    @InjectModel(Book.name)
    private readonly bookModel: SoftDeleteModel<BookDocument>,
  ) {}

  async create(payload: any) {
    try {
      return await this.bookModel.create(payload);
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
      const features = new APIFeatures(this.bookModel.find(), queryString)
        .filter()
        .sorting()
        .limitFields();

      const totalItems = await this.bookModel.countDocuments(
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
    return await this.bookModel.findOne({ _id: payload });
  }

  async delete(bookId: string) {
    const deleteUser = await this.bookModel.softDelete({
      _id: bookId,
    });
    return deleteUser;
  }

  async update(payload: any) {
    const data = payload.data;

    try {
      const updateBook = await this.bookModel.findOneAndUpdate(
        {
          _id: payload.bookId,
        },
        data,
        {
          new: true,
        },
      );
      if (!updateBook) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `book dengan ID ${payload.bookId} tidak di temukan`,
        });
      }
      return updateBook;
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
    }
  }
}
