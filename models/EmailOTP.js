import mongoose from "mongoose";

export const emailOtpSchema = new mongoose.Schema({
//   user_id: {
//     type: mongoose.Schema.Types.ObjectId,
//     required: true,
//     ref: "AllUser",
//   },
  perpous: {
    type: String,
    enum: ["signup", "forgetpassword"],
    required: false,
  },
  otp: {
    type: Number,
    required: [false, "otp must"],
  },
  verifiedAt: {
    type: Date,
    required: false, // Should be 'false' since it is not mandatory
  },
},
{
  timestamps: true,
});

const EmailOtp = mongoose.model("EmailOtp", emailOtpSchema);

export default EmailOtp;
