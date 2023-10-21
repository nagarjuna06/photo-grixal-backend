import customerSchema from "../models/customerSchema.js";
import photographerSchema from "../models/photographerSchema.js";

export const getOtpPurpose = (purpose) => {
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
    case "login":
      subject = "OTP Verification";
      break;
    default:
      subject = "";
  }
  return subject;
};

export const getUserTypeModel = (userType) => {
  switch (userType) {
    case "photographer":
      return photographerSchema;
    case "customer":
      return customerSchema;
    default:
      return;
  }
};
