import { Schema, model } from "mongoose";

const paymentHistorySchema = new Schema(
    {
        contractDetailsId:{
            type:Number,
            required:true,
            unique:true,
        },
        amountPaid:{
            type:Number,
            default:0,
            required:true,
        },
        paymentMethod:{
            type:String,
            
        }

    },
    {
        timestamps: {
          createdAt: "paidDate",
          updatedAt: true,
        },
    }
);
export default model("paymentHistory", paymentHistorySchema);