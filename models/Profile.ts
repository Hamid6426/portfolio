import mongoose, { Schema, Document, Types } from "mongoose";
import { IUser } from "./User";

// Define the User document interface
export interface IProfile extends Document {
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  zipCode?: string;
  address?: string;
  phone?: string;

  whatsapp?: string;
  telegram?: string;
  discord?: string;
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  tiktok?: string;

  bio?: string;
  profilePicture?: string;
  user: IUser; // populated donor details
}

// Create the User schema
const ProfileSchema: Schema = new Schema(
  {
    country: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    street: {
      type: String,
      default: null,
    },
    zipCode: {
      type: String,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    phone: {
      type: String,
      default: null,
    },
    whatsapp: {
      type: String,
      default: null,
    },
    telegram: {
      type: String,
      default: null,
    },
    discord: {
      type: String,
      default: null,
    },
    facebook: {
      type: String,
      default: null,
    },
    twitter: {
      type: String,
      default: null,
    },
    instagram: {
      type: String,
      default: null,
    },
    linkedin: {
      type: String,
      default: null,
    },
    tiktok: {
      type: String,
      default: null,
    },
    bio: {
      type: String,
      default: null,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the User model or reuse the existing one
export default mongoose.models.Profile || mongoose.model<IProfile>("Profile", ProfileSchema);
