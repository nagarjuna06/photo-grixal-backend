import { Schema, model } from "mongoose";

const { ObjectId } = Schema;
const contractSchema = new Schema(
  {
    photographerId: {
      type: ObjectId,
      ref: "photographers",
    },
    customerId: {
      type: ObjectId,
      ref: "customers",
    },
    gigId: {
      type: ObjectId,
      ref: "gigs",
    },
    contractStatus: {
      type: String,
      default: "pending",
    },
  },
  {
    timestamps: {
      createdAt: "contractDate",
      updatedAt: true,
    },
  }
);

export default model("contracts", contractSchema);
