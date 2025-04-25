// src/app/api/items/[itemId]/receiver-actions/make-request/route.ts

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

    // 3. Validate state
    if (item.donor.toString() === userId) {
      throw { status: 400, message: "Donor cannot request their own item" };
    }
    if (item.isRequested || item.status !== "available") {
      throw { status: 400, message: "Item is not available for request" };
    }

    // 4. Apply request
    item.receiver          = userId;
    item.requesters.push(userId);
    item.isRequested       = true;
    item.requestCancelled  = false;
    item.requestAccepted   = false;
    item.isAccepted        = false;
    item.status            = "requested";

    await item.save();

    // 5. Save & return
    const updated = await Item.findById(item._id)
      .populate("donor", "name email")
      .populate("receiver", "name email");

    return NextResponse.json(
      { message: "Request submitted", item: updated },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to make request" },
      { status: err.status || 500 }
    );
  }
}
