// models/index.js

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Specified the model name as "CustomUserCollectionName"
export default mongoose.model("user", userSchema);
