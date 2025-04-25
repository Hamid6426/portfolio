// src/app/api/items/[itemId]/donor-actions/reactivate-item/route.ts

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
    // 1. Auth
    const auth = req.headers.get("Authorization") || "";
    const token = auth.replace("Bearer ", "");
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // 2. Authorize
    await connectToDatabase();
    const user = await User.findById(decoded.userId);
    if (!user) throw { status: 404, message: "User not found" };

    const item = await Item.findById(params.itemId);
    if (!item) throw { status: 404, message: "Item not found" };

    if (item.donor.toString() !== decoded.userId) {
      throw { status: 403, message: "Only the donor can reactivate this item" };
    }

    // 3. Reactivate Logic
    item.status      = "available";
    item.isCancelled = false;
    // all other flags remain false, and requesters/receiver remain cleared

    await item.save();

    // 4. Return populated item
    const updated = await Item.findById(item._id)
      .populate("donor", "name email");

    return NextResponse.json(
      { message: "Item reactivated", item: updated },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to reactivate item" },
      { status: err.status || 500 }
    );
  }
}
