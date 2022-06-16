import { Document, model, Schema } from "mongoose";

export interface IUser extends Document {
  name: string;
  username: string;
  password: string;
  role: string;
  movieCounters: number;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String },
    username: { type: String },
    password: { type: String },
    role: {
      type: String,
      default: "basic",
      enum: ["basic", "premium"],
      hide: true,
    },
    movieCounters: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const User = model<IUser>("User", UserSchema);

export default User;
