// app/api/chats/route.ts
import { NextResponse, NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Chat from "@/models/Chat";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

// CHAT STARTER
export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();
    const { senderId, receiverId } = body;

    if (!senderId || !receiverId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!Types.ObjectId.isValid(senderId) || !Types.ObjectId.isValid(receiverId)) {
      return NextResponse.json({ error: "Invalid user IDs" }, { status: 400 });
    }

    if (senderId === receiverId) {
      return NextResponse.json({ error: "Cannot start chat with self" }, { status: 400 });
    }

    const chatId = [senderId, receiverId].sort().join("_"); // same chatId for both users

    let chat = await Chat.findOne({ chatId });

    if (!chat) {
      chat = await Chat.create({
        chatId,
        participants: [senderId, receiverId],
      });
    }

    return NextResponse.json(chat, { status: 200 });
  } catch (error) {
    console.error("Chat Start Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// CHAT LIST
export async function GET(req: NextRequest) {
  try {
    const auth = req.headers.get("Authorization") || "";

    if (!auth.startsWith("Bearer ")) {
      const error = new Error("Unauthorized");
      (error as any).status = 401;
      throw error;
    }

    const token = auth.replace("Bearer ", "");
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    await connectToDatabase();

    // validation
    if (!Types.ObjectId.isValid(decoded.userId)) {
      return NextResponse.json({ error: "Invalid userId" }, { status: 400 });
    }

    // chats of this participant
    const chats = await Chat.find({ participants: decoded.userId }).sort({ updatedAt: -1 });

    return NextResponse.json(chats, { status: 200 });
  } catch (error) {
    console.error("Get Chats Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
