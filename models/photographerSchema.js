import { Schema, model } from "mongoose";
const { ObjectId } = Schema;
const photographerSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    from: {
      type: String,
    },
    bio: {
      type: String,
    },
    languages: {
      type: Array,
    },
    skills: {
      type: Array,
    },
    level: {
      type: Number,
      default: 0,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    gigs: [{ type: ObjectId, ref: "gigs" }],
    contacts: {
      type: Array,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: "joined",
      updatedAt: true,
    },
  }
);

export default model("photographers", photographerSchema);
