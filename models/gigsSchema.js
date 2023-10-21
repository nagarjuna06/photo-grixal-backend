import { Schema, model } from "mongoose";
const { ObjectId } = Schema;

const planSchema = new Schema({
  planType: {
    type: String,
    required: true,
  },
  delivery: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  points: {
    type: Array,
  },
});

const gigsSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    images: {
      type: Array,
    },
    eventType: {
      type: Array,
    },
    plans: [planSchema],
    locations: {
      type: Array,
    },
    photographer: { type: ObjectId, ref: "photographers" },
    status: {
      type: String,
      default: "unpublish",
      enum: ["unpublish", "review", "approve", "publish"],
    },
  },
  { timestamps: true }
);

export default model("gigs", gigsSchema);
