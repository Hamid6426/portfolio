// src/app/api/items/donor/requested-items/route.ts
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/Item";
import User from "@/models/User";

export async function GET(req: NextRequest) {
  try {
    const auth = req.headers.get("Authorization") || "";
    const token = auth.replace("Bearer ", "");
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.userId;

    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) throw { status: 404, message: "User not found" };

    // Only those the donor has requests on
    const items = await Item.find({ donor: userId, status: "requested" })
      .populate("donor", "name email")
      .populate("receiver", "name email");

    return NextResponse.json({ items }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: err.status || 500 });
  }
}
