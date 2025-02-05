import { Model, Schema } from 'mongoose';

const profileSchema = new Schema(
  {
    name: { type: String, required: true },
    avatar: { type: String, required: false },
    email: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  },
  { timestamps: true },
);

const Profile = Model('Profile', profileSchema);

export default Profile;
