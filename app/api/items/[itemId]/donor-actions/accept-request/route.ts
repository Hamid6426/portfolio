// src/app/api/items/[itemId]/donor-actions/cancel-request/route.ts

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/Item";
import User from "@/models/User";

export async function POST(req: NextRequest, { params }: { params: { itemId: string } }) {
  try {
    const auth = req.headers.get("Authorization") || "";
    const token = auth.replace("Bearer ", "");
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    await connectToDatabase();
    const user = await User.findById(decoded.userId);
    if (!user) throw { status: 404, message: "User not found" };

    const item = await Item.findById(params.itemId);
    if (!item) throw { status: 404, message: "Item not found" };

    if (item.donor.toString() !== decoded.userId) {
      throw { status: 403, message: "Only the donor can accept the request" };
    }

    if (!item.isRequested || !item.receiver) {
      throw { status: 400, message: "No pending request to accept" };
    }

    if (item.status === "claimed" || item.requestAccepted) {
      throw { status: 400, message: "This request has already been accepted" };
    }

    item.requestAccepted = true;
    item.isAccepted = true;
    item.isClaimed = true;
    item.status = "claimed";

    item.isRequested = false;
    item.isCancelled = false;
    item.isPicked = false;
    item.isDonated = false;
    item.requestCancelled = false;

    await item.save();

    const updatedItem = await Item.findById(item._id).populate("donor", "name email").populate("receiver", "name email");

    return NextResponse.json({ message: "Request accepted", item: updatedItem });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to accept request" }, { status: err.status || 500 });
  }
}
