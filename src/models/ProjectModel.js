import { Schema, model } from 'mongoose';

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    isCurrent: { type: Boolean, default: true },
    // organization: {
    //   type: Schema.Types.ObjectId,
    //   ref: 'Organization',
    //   required: true,
    // },
    admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: { type: [Schema.Types.ObjectId], ref: 'User', required: false },
  },
  { timestamps: true },
);

const Project = model('Project', projectSchema);

export default Project;
