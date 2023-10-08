import { Schema, model } from "mongoose";

const { ObjectId } = Schema;
const paymentHistorySchema = new Schema(
  {
    contractDetailsId: {
      type: ObjectId,
    },
    amountPaid: {
      type: Number,
      default: 0,
      required: true,
    },
    paymentMethod: {
      type: String,
    },
  },
  {
    timestamps: {
      createdAt: "paidDate",
      updatedAt: true,
    },
  }
);
export default model("paymentHistory", paymentHistorySchema);
