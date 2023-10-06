import { Schema, model } from "mongoose";

const contractSchema = new Schema(
    {
        photographerId:{
            type:Number,
            required:true,
            unique: true,
        },
        customerId:{
            type:Number,
            required:true,
            unique: true,
        },
        gigId:{
            type:Number,
            required:true,
            unique:true,
        },
        amount:{
            type:Number,
            required:true,
        },
        contractStatus:{
            type:String,
            default:"pending",
        }
    },
    {
        timestamps: {
          createdAt: "contractDate",
          updatedAt: true,
        },
    }
);

export default model("contractSchema", contracts);