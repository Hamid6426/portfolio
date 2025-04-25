// app/api/messages/route.ts
import { NextResponse } from "next/server";
import Message from "@/models/Message";
import Chat from "@/models/Chat";
import { Types } from "mongoose";
import connectToDatabase from "@/lib/mongodb";
import jwt from "jsonwebtoken";

// Send a message to a chat from a sender
export async function POST(req: Request) {
  try {
    const auth = req.headers.get("Authorization") || "";

    if (!auth.startsWith("Bearer ")) {
      const error = new Error("Unauthorized");
      (error as any).status = 401;
      throw error;
    }

    const token = auth.replace("Bearer ", "");
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const senderId = decoded.userId;
    await connectToDatabase();

    const { chatId, text } = await req.json();

    if (!chatId || !Types.ObjectId.isValid(senderId) || !text?.trim()) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    // Optionally validate if the current chatId exists
    const chat = await Chat.findOne({ chatId });
    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    const newMessage = await Message.create({
      chatId,
      sender: senderId,
      text,
    });

    return NextResponse.json(newMessage, { status: 201 });
  } catch (error) {
    console.error("Message Send Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// Handler for fetching the chat of a certain chatId from the database
export async function GET(req: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(req.url);
    const chatId = searchParams.get("chatId");

    if (!chatId) {
      return NextResponse.json({ error: "chatId is required" }, { status: 400 });
    }

    const messages = await Message.find({ chatId }).sort({ timestamp: 1 });

    return NextResponse.json(messages, { status: 200 });
  } catch (error) {
    console.error("Get Messages Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
