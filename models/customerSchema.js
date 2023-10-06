import { Schema, model } from "mongoose";

const customerSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        address:{
            type: String,
            required: true,
        },
        contacts: {
            type: Array,
        },
        verified: {
            type: Boolean,
            default: false,
        },
    }
);
export default model("customer", customerSchema);