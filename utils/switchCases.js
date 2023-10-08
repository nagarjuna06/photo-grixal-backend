import customerSchema from "../models/customerSchema";
import photographerSchema from "../models/photographerSchema";

export const getOtpPurpose = (purpose)=>{
    let subject = null;
    switch (purpose) {
        case "register":
          subject = "OTP Verification";
          break;
        case "resend":
          subject = "OTP Verification";
          break;
        case "reset":
          subject = "OTP for Password Reset verification";
          break;
        default:
          subject = "";
      }
      return subject
}

export const getUsertypeModel = (userType)=>{
    switch(userType) {
        case "photographer" :return photographerSchema;
        case "customer" : return customerSchema;
        default :return;
    }
}
