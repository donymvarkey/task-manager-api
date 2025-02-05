import { Model, Schema } from 'mongoose';

const commentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
    created_by: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true },
);

const Comment = Model('Comment', commentSchema);

export default Comment;
