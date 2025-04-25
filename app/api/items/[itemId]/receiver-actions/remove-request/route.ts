// src/app/api/items/[itemId]/receiver-actions/remove-request/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/Item";
import User from "@/models/User";

export async function POST(
  req: NextRequest,
  { params }: { params: { itemId: string } }
) {
  try {
    // 1. Authenticate
    const auth = req.headers.get("Authorization") || "";
    const token = auth.replace("Bearer ", "");
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const userId = decoded.userId;

    // 2. Authorize & fetch
    await connectToDatabase();
    const user = await User.findById(userId);
    if (!user) throw { status: 404, message: "User not found" };

    const item = await Item.findById(params.itemId);
    if (!item) throw { status: 404, message: "Item not found" };

    if (item.receiver?.toString() !== userId || !item.isRequested) {
      throw { status: 400, message: "No active request to remove" };
    }

    // 3. Revert request
    item.requestCancelled = true;
    item.isRequested      = false;
    item.requestAccepted  = false;
    item.isAccepted       = false;
    item.status           = "available";

    item.receiver   = null;
    item.requesters = item.requesters.filter(
      (rid) => rid.toString() !== userId
    );

    await item.save();

    // 4. Return
    const updated = await Item.findById(item._id).populate(
      "donor",
      "name email"
    );
    return NextResponse.json(
      { message: "Request removed", item: updated },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to remove request" },
      { status: err.status || 500 }
    );
  }
}
