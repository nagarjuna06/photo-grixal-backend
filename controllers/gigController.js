import cloudinary from "../middleware/cloudinary.js";
import gigsSchema from "../models/gigsSchema.js";
import photographerSchema from "../models/photographerSchema.js";
import { InternalServerError } from "../request-errors/index.js";

export const createGig = async (req, res, next) => {
  req.body.photographer = req.user.id;
  try {
    const gig = await gigsSchema.create(req.body);
    await photographerSchema.updateOne(
      { _id: req.user.id },
      {
        $addToSet: { gigs: gig._id },
      }
    );
    req.body._id = gig._id;
    next();
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};

export const updateGig = async (req, res) => {
  try {
    const gig = await gigsSchema.findOneAndUpdate(
      { _id: req.params.gigId },
      req.body,
      {
        new: true,
      }
    );
    return res.json(gig);
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};

export const deleteGig = async (req, res) => {
  const { images = 1 } = req.query;
  const { gigId } = req.params;
  try {
    for (var i = 0; i < parseInt(images); i++) {
      const publicId = `photoGrixal/gigs/${gigId}_${i}`;
      await cloudinary.uploader.destroy(publicId);
    }
    await gigsSchema.deleteOne({ _id: gigId });
    await photographerSchema.updateOne(
      { _id: req.user.id },
      { $pull: { gigs: gigId } }
    );
    return res.json({ msg: "post deleted Successfully" });
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};

export const getPhotographerGigs = async (req, res) => {
  try {
    const gigs = await gigsSchema.find({ photographer: req.user.id });
    return res.json(gigs);
  } catch (error) {
    return InternalServerError(res, error.message);
  }
};
