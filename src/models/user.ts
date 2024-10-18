import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
  },
  password: {
    type: String,
    select: false,
  },
  username: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  phoneNumber: {
    type: String,
    match: /^\d{8,15}$/,
  },
  bio: {
    type: String,
    maxLength: 150,
  },
  authProviderId: {
    type: String,
  },
  provider: {
    type: String,
    enum: ["local", "google", "github", "facebook", "twitter"],
    required: true,
  },
});

export const User = models?.User || model("User", userSchema);
export default User;
