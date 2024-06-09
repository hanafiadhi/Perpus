import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { HttpStatus, Injectable } from '@nestjs/common';

import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { RpcException } from '@nestjs/microservices';
import { APIFeatures } from '../common/utils/apiFeatures';
import mongoose, { ClientSession, Connection } from 'mongoose';
import { Member, MemberDocument } from '../member/schema/member.schema';
import { Book, BookDocument } from '../books/schema/books.schema';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: SoftDeleteModel<MemberDocument>,
    @InjectModel(Book.name)
    private readonly bookModel: SoftDeleteModel<BookDocument>,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async borrowBook(bookCode: string, memberCode: string) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      const book = await this.bookModel
        .findOne({ code: bookCode })
        .session(session);

      if (!book) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Book dengan code ${bookCode} tidak ditemukan`,
        });
      }

      if (book.stock <= 0) {
        throw new RpcException({
          statusCode: HttpStatus.BAD_REQUEST,
          message: `buku dengan code ${bookCode} sedang di pinjam`,
        });
      }

      await this.bookModel.findOneAndUpdate(
        { code: bookCode },
        { $inc: { stock: -1 } },
        { new: true, session },
      );
      const firstBook = await this.memberModel.findOne(
        { code: memberCode },
        { books: { $slice: 1 } },
      );

      if (firstBook.books[0]?.status === 'Not Back')
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Member dengan code ${memberCode} silahkan kembalikan bukunya yang di pinjam terlebih dahulu`,
        });

      if (firstBook.books[0]?.penalty_date > Date.now())
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Member dengan code ${memberCode} masih dalam penalti`,
        });

      const { code, title, author } = book;
      const currentTimestamp = Date.now();
      const sevenDaysInMilliseconds = 7 * 24 * 60 * 60 * 1000;
      const futureTimestamp = currentTimestamp + sevenDaysInMilliseconds;
      const member = await this.memberModel.findOneAndUpdate(
        {
          code: memberCode,
        },
        {
          $push: {
            books: {
              $each: [
                {
                  code,
                  title,
                  author,
                  penalty_date: null,
                  status: 'Not Back',
                  start_date: Date.now(),
                  end_date: futureTimestamp,
                },
              ],
              $position: 0,
            },
          },
        },
        {
          new: true,
          session,
        },
      );

      if (!member) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Member dengan code ${memberCode} tidak ditemukan`,
        });
      }

      await session.commitTransaction();
      session.endSession();

      return {
        statusCode: HttpStatus.CREATED,
        message: 'Yeay buku berhasil di pinjam',
        data: member,
      };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }

  async returnBook(bookCode: string, memberCode: string) {
    const session = await this.connection.startSession();
    session.startTransaction();
    try {
      /**
       * cari code member dan kode bukunya
       * jika end_date kurang dari sama dengan Date.now() -> maka tidak terkena penalti
       * jika lebih maka terkena penalti selama 3 hari
       * update member ubah books[0]status menjadi Back
       *
       * cari code buku udate stocknya menjadi 1 lagi
       */
      //   const book = await this.bookModel
      //     .findOne({ code: bookCode })
      //     .session(session);

      //   if (!book) {
      //     throw new RpcException({
      //       statusCode: HttpStatus.NOT_FOUND,
      //       message: `Book dengan code ${bookCode} tidak ditemukan`,
      //     });
      //   }

      const book = await this.bookModel.findOneAndUpdate(
        { code: bookCode },
        { $inc: { stock: 1 } },
        { new: true, session },
      );
      if (!book) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Book dengan code ${bookCode} tidak ditemukan`,
        });
      }

      const firstBook = await this.memberModel.findOne(
        {
          code: memberCode,
          books: { $elemMatch: { code: bookCode, status: 'Not Back' } },
        },
        { books: { $slice: 1 } },
      );
      if (!firstBook)
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `buku dengan code ${bookCode} tidak ditemukan di member`,
        });
      let status, penalty_date;
      const currentTimestamp = Date.now();
      const sevenDaysInMilliseconds = 3 * 24 * 60 * 60 * 1000;
      const futureTimestamp = currentTimestamp + sevenDaysInMilliseconds;
      if (firstBook.books[0]?.end_date >= Date.now()) {
        status = 'Back';
        penalty_date = null;
      } else {
        status = 'Back';
        penalty_date = futureTimestamp;
      }

      const member = await this.memberModel.findOneAndUpdate(
        {
          code: memberCode,
          books: { $elemMatch: { code: bookCode, status: 'Not Back' } },
        },
        {
          $set: {
            'books.$.status': status,
            'books.$.penalty_date': penalty_date,
          },
        },
        {
          new: true,
          session,
        },
      );

      if (!member) {
        throw new RpcException({
          statusCode: HttpStatus.NOT_FOUND,
          message: `Member dengan code ${memberCode} tidak ditemukan`,
        });
      }

      await session.commitTransaction();
      session.endSession();

      return {
        statusCode: HttpStatus.OK,
        message: 'Terimakasih buku telah di kembalikan',
        data: member,
      };
    } catch (error) {
      console.error('Error during transaction:', error);
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  }
}
