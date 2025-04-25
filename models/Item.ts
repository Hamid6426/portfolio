import mongoose, { Schema, Document, Model } from "mongoose";
import { IUser } from "./User";

export interface IItem extends Document {
  title: string;
  description: string;
  quantity: number;
  category: string;
  condition: "new" | "used" | "poor";
  images: string[];

  donor: IUser; // populated donor details
  receiver?: IUser | null; // populated when someone claims the item
  requesters: IUser[]; // populated list of users who have requested

  status: "inactive" | "available" | "requested" | "claimed" | "picked" | "donated";
  // inactive, when the donor change his mind about donating. simply a soft delete
  // available mean an item is available for donation
  // requested mean a user has requested for the item "it is not confirmed by donor yet"
  // claimed mean the item is claimed by the receiver "it is not picked up yet"
  // picked mean a receiver has picked up the item, it would be marked as donated
  // donated mean the item is donated to the receiver and request is completed

  // flags for individual transitions (helps drive UI and business logic)
  isRequested: boolean; // set true when any request is made
  requestAccepted: boolean; // true if donor approves a specific request
  requestCancelled: boolean; // true if receiver withdraws their request

  isAccepted: boolean; // true when a request has been accepted
  isCancelled: boolean; // true if donor cancels the entire item
  isClaimed: boolean; // true when donor confirms a pickup
  isPicked: boolean; // true when receiver collects the item
  isDonated: boolean; // true when the donation is fully completed

  createdAt: Date;
  updatedAt: Date;
}

function validateImageLimit(val: string[]): boolean {
  return val.length <= 4;
}

const ItemSchema: Schema<IItem> = new Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    quantity: { type: Number, default: 1, min: 1 },
    category: { type: String, required: true, trim: true },
    condition: {
      type: String,
      enum: ["new", "used", "poor"],
      default: "used",
      required: true,
    },

    images: {
      type: [String],
      validate: [validateImageLimit, "Cannot add more than 4 images"],
      default: [],
    },

    donor: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: Schema.Types.ObjectId, ref: "User", default: null },

    // ——— Track who has requested this item ———
    requesters: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },

    status: {
      type: String,
      enum: ["inactive", "available", "requested", "claimed", "picked", "donated"],
      default: "available",
    },

    // —— Boolean flags for each stage ——
    isRequested: { type: Boolean, default: false },
    requestAccepted: { type: Boolean, default: false },
    requestCancelled: { type: Boolean, default: false },

    isAccepted: { type: Boolean, default: false },
    isCancelled: { type: Boolean, default: false },
    isClaimed: { type: Boolean, default: false },
    isPicked: { type: Boolean, default: false },
    isDonated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default (mongoose.models.Item as Model<IItem>) || mongoose.model<IItem>("Item", ItemSchema);
