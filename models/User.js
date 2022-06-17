const mongoose = require("mongoose");
import crypto from "crypto";
const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilepicture: {
      type: String,
    },
    accessToken: {
      type: String,
      default: () => crypto.randomBytes(128).toString("hex"),
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
