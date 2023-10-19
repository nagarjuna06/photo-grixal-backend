import { InternalServerError } from "../request-errors/index.js";
import { getUserTypeModel } from "../utils/switchCases.js";

export const updateProfile = async (req, res) => {
  const model = getUserTypeModel(req.params.userType);
  try {
    const user = await model.findOneAndUpdate({ _id: req.user.id }, req.body, {
      new: true,
    });
    user.password = undefined;
    user._id = null;
    res.json(user);
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};
