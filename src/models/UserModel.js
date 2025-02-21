import { model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userModel = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    avatar: { type: String, required: false },
  },
  { timestamps: true },
);

userModel.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare password
userModel.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compareSync(candidatePassword, this.password);
};

const User = model('User', userModel);

export default User;
