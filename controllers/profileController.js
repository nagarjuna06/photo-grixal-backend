import { InternalServerError } from "../request-errors/index.js";

export const updateProfile = async (req, res) => {
  try {
    const user = await req.model.findOneAndUpdate(
      { _id: req.user.id },
      req.body,
      {
        new: true,
      }
    );
    user.password = undefined;
    user._id = null;
    res.json(user);
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};
