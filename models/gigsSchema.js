import { Schema, model } from "mongoose";
const { ObjectId } = Schema;
const gigsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  images: {
    type: Array,
    required: true,
  },
  eventType: {
    type: Array,
  },
  pricing: {
    type: Number,
    required: true,
  },
  delivery: {
    type: Number,
  },
  locations: {
    type: Array,
  },
  photographer: { type: ObjectId, ref: "photographers" },
});

export default model("gigs", gigsSchema);
