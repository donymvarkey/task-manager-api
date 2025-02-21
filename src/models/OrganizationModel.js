import { Schema, model } from 'mongoose';

const organizationSchema = new Schema(
  {
    name: { type: String, required: true },
    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    members: { type: [Schema.Types.ObjectId], ref: 'User', required: false },
    inviteCode: { type: String, unique: true }, // Unique invite code
    inviteCodeExpiresAt: { type: Date, expires: 30 }, // Invite code expires in 5 minutes
  },
  { timestamps: true },
);

const Organization = model('Organization', organizationSchema);

export default Organization;
