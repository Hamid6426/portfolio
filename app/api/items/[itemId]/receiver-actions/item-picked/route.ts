// src/app/api/items/[itemId]/receiver-actions/item-picked/route.ts

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

    if (item.receiver?.toString() !== userId) {
      throw { status: 403, message: "Only the assigned receiver can pick up" };
    }
    if (item.status !== "claimed" || !item.isAccepted) {
      throw { status: 400, message: "Item must be claimed first" };
    }

    // 3. Complete donation
    item.isPicked  = true;
    item.isDonated = true;
    item.status    = "donated";

    await item.save();

    // 4. Return
    const updated = await Item.findById(item._id)
      .populate("donor", "name email")
      .populate("receiver", "name email");

    return NextResponse.json(
      { message: "Item marked as picked & donated", item: updated },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to pick up item" },
      { status: err.status || 500 }
    );
  }
}
