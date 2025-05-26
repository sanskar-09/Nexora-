import mongoose, { Document, Model, Schema } from 'mongoose';

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const User: Model<IUser> = mongoose.model<IUser>('User', userSchema);

const createUser = async (userData: IUser): Promise<IUser> => {
  const user = new User(userData);
  return await user.save();
};

const findByEmail = async (email: string): Promise<IUser | null> => {
  return await User.findOne({ email });
};

export { User, createUser, findByEmail };