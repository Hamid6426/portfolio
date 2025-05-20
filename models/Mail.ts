// models/Mail.ts
import mongoose, { Schema, Document, models } from "mongoose";

export interface IMail extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const MailSchema = new Schema<IMail>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default models.Mail || mongoose.model<IMail>("Mail", MailSchema);
