import { Schema, model } from "mongoose";

const { ObjectId } = Schema;

const chatSchema = Schema(
  {
    chatUsers: { type: Array, required: true },
    sender: { type: ObjectId, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export default model("chats", chatSchema);
