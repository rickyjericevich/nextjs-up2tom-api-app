import { Document, Schema, models, model, Model } from "mongoose";

export interface User {
  email: string;
  password: string;
}

export interface UserDocument extends User, Document { }

const userSchema = new Schema<UserDocument>({
  email: {
    type: String,
    required: [true, "Please provide an email for this user."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide a password for this user"],
    minlength: [8, "Password cannot be less than 8 characters"],
  },
});

export const UserModel: Model<UserDocument> = models?.User || model<UserDocument>("User", userSchema);
