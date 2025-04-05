import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
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
    role: {
        type: String,
        require: true,
        enum: ["USER", "ADMIN"],
        default: "CURRENT",
    },
  },
  { timestamps: true }
);

const User = models.User || model("User", userSchema);

export default User;
