import { model, Schema } from 'mongoose';

const taskSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    project: { type: Schema.Types.ObjectId, required: true, ref: 'Project' },
    type: { type: Number, required: true },
    priority: { type: Number, default: 0 }, // Low priority by default
    assigned_to: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    status: { type: Number, default: 0, required: false },
    created_by: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
    start_date: { type: Date, required: false },
    end_date: { type: Date, required: false },
    media: { type: [String], required: false },
  },
  { timestamps: true },
);

const Task = model('Task', taskSchema);

export default Task;
