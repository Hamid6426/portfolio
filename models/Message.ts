import mongoose, { Schema, Document, Model, Types } from "mongoose";
import { IUser } from "./User";

export interface IMessage extends Document {
  chatId: string; // Refers to Chat.chatId (not _id)
  sender: Types.ObjectId | IUser; // The user who sent the message
  text: string; // The message content
  timestamp: Date; // Time message was sent
}

const MessageSchema: Schema<IMessage> = new Schema(
  {
    chatId: {
      type: String,
      required: true,
      index: true, // Enables fast retrieval of messages by chatId
    },
    sender: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      trim: true,
      maxlength: 2000,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index messages by chatId and timestamp for fast ordered retrieval
MessageSchema.index({ chatId: 1, timestamp: -1 });

// Prevent model overwrite in dev
export default (mongoose.models.Message as Model<IMessage>) || mongoose.model<IMessage>("Message", MessageSchema);
