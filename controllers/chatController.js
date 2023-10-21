import chatSchema from "../models/chatSchema.js";
import { InternalServerError } from "../request-errors/index.js";

export const getMessages = async (req, res) => {
  const { to } = req.body;
  const from = req.user.id;
  try {
    const messages = await chatSchema
      .find(
        { chatUsers: { $all: [from, to] } },
        { _id: 0, __v: 0, chatUsers: 0 }
      )
      .sort({ createdAt: 1 });
    return res.json(
      messages.map((each) => ({
        from: each.sender.toString() === from,
        message: each.message,
        createdAt: each.createdAt,
      }))
    );
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};

export const sendMessage = async (req, res) => {
  const { to, message } = req.body;
  const from = req.user.id;
  try {
    await chatSchema.create({ chatUsers: [from, to], sender: from, message });
    res.json({ msg: "message sent successfully!" });
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};
