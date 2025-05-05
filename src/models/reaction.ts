// src/models/reaction.ts
import { Schema, Types } from 'mongoose';

export interface IReaction {
  reactionId: Types.ObjectId;
  reactionBody: string;
  username: string;
  createdAt: string;   // after getter, this will be a string
}

export const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
      get: (ts: Date) => ts.toLocaleString(),
    } as any,
  },
  {
    toJSON: { getters: true },
    id: false,
  }
);
