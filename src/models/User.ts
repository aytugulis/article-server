import bcrypt from 'bcryptjs';
import { Schema, model } from 'mongoose';
import { emailRegex } from '../helpers/formatter';

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide a email'],
    unique: true,
    match: [emailRegex, 'Please provide a valid email'],
  },
  password: {
    type: String,
    minlength: [8, 'Please provide a password with min length 8'],
    required: [true, 'Please provide a password'],
    select: false,
  },
  role: {
    type: String,
    default: 'user',
    enum: ['user', 'admin'],
  },
});

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 10);
});

export const User = model('User', UserSchema);
