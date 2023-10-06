import { Schema, model } from "mongoose";

const otpSchema = Schema({
  otp: {
    type: Number,
    required: true,
  },
  recipient: {
    type: String,
    required: true,
  },
  createdTime: {
    type: Date,
    expires: "10m",
    default: Date.now,
  },
});

const otpModel = model("Otp", otpSchema);

export default otpModel;
