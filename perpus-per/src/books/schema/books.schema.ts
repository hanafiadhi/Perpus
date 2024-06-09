import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { IBooksSchema } from '../../common/interface/book.interface';

@Schema({
  collection: 'book',
  strict: 'throw',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
})
export class Book extends Document implements IBooksSchema {
  @Prop({
    required: true,
    index: { partialFilterExpression: { isDeleted: false }, unique: true },
  })
  code: string;

  @Prop({ type: String, required: true })
  title: string;

  @Prop({ type: String, required: true })
  author: string;

  @Prop({ type: Number, required: true })
  stock: number;
}

export type BookDocument = HydratedDocument<Book>;

export const BookSchema =
  SchemaFactory.createForClass(Book).plugin(softDeletePlugin);
