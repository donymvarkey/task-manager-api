const { Schema, Model } = require('mongoose');

const projectSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    organization: {
      type: Schema.Types.ObjectId,
      ref: 'Organization',
      required: true,
    },
    admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: { type: [Schema.Types.ObjectId], ref: 'User', required: true },
  },
  { timestamps: true },
);

const Project = Model('Project', projectSchema);

export default Project;
