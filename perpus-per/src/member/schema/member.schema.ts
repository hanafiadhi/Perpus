import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';
import { softDeletePlugin } from 'soft-delete-plugin-mongoose';
import { IMemberSchema } from '../../common/interface/member.interface';

@Schema({
  collection: 'member',
  strict: 'throw',
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
  versionKey: false,
})
export class Member extends Document implements IMemberSchema {
  @Prop({
    required: true,
    index: { partialFilterExpression: { isDeleted: false }, unique: true },
  })
  code: string;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({
    type: () => [
      {
        code: { type: String },
        title: { type: String },
        author: { type: String },
        status: { type: String, default: 'Not Back' },
        start_date: { type: Number, default: null },
        end_date: { type: Number, default: null },
        penalty_date: { type: Number, default: null },
      },
    ],
    required: false,
    default: [],
  })
  books: {
    code: string;
    title: string;
    author: string;
    status: string;
    start_date: number | null;
    end_date: number | null;
    penalty_date: number | null;
  }[];
}

export type MemberDocument = HydratedDocument<Member>;

export const MemberSchema =
  SchemaFactory.createForClass(Member).plugin(softDeletePlugin);
