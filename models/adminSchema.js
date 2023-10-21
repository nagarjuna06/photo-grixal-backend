import { Schema, model } from "mongoose";

const adminSchema = Schema(
  {
    name: { type: String },
    email: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "team"],
    },
  },
  {
    timestamps: true,
  }
);

export default model("admins", adminSchema);
