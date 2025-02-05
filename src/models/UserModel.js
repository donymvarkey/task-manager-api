import { Model, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

const userModel = new Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const User = Model('User', userModel);

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

export default User;
