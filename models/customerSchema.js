import { Schema, model } from "mongoose";

const { ObjectId } = Schema;

const customerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  address: {
    type: String,
  },
  contacts: [{ type: ObjectId, ref: "photographers" }],
  verified: {
    type: Boolean,
    default: false,
  },
});
export default model("customers", customerSchema);
