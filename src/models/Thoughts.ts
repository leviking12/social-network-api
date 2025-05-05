import { Schema, model, Document, Types } from 'mongoose';
import { reactionSchema, IReaction } from './reaction';

export interface IThought extends Document {
  thoughtText: string;
  createdAt: string;      // after getter, this will be a string
  username: string;
  reactions: IReaction[];
  reactionCount: number;
}

const thoughtSchema = new Schema<IThought>(
  {
    thoughtText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: () => new Date(),
      get: (ts: Date) => ts.toLocaleString(),
    } as any,    // ← cast here too
    username: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: { virtuals: true, getters: true },
    id: false,
  }
);

thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
  return this.reactions.length;
});

export default model<IThought>('Thought', thoughtSchema);
