import { InjectModel } from '@nestjs/mongoose';
import { HashingService } from '../hashing.service';
import { Logger } from '@nestjs/common';
import { Model } from 'mongoose';
import { Member } from '../member/schema/member.schema';
import { Book } from '../books/schema/books.schema';

export class SeedService {
  constructor(
    @InjectModel(Member.name)
    private readonly memberModel: Model<Member>,
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>,
  ) {}
  private readonly logger = new Logger();

  async seed() {
    try {
      const Book = [
        {
          code: 'JK-45',
          title: 'Harry Potter',
          author: 'J.K Rowling',
          stock: 1,
        },
        {
          code: 'SHR-1',
          title: 'A Study in Scarlet',
          author: 'Arthur Conan Doyle',
          stock: 1,
        },
        {
          code: 'TW-11',
          title: 'Twilight',
          author: 'Stephenie Meyer',
          stock: 1,
        },
        {
          code: 'HOB-83',
          title: 'The Hobbit, or There and Back Again',
          author: 'J.R.R. Tolkien',
          stock: 1,
        },
        {
          code: 'NRN-7',
          title: 'The Lion, the Witch and the Wardrobe',
          author: 'C.S. Lewis',
          stock: 1,
        },
      ];
      await this.bookModel.insertMany(Book);

      const member = [
        {
          code: 'M001',
          name: 'Angga',
        },
        {
          code: 'M002',
          name: 'Ferry',
        },
        {
          code: 'M003',
          name: 'Putri',
        },
      ];
      await this.memberModel.insertMany(member);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
