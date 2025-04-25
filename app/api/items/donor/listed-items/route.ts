// src/app/api/items/donor/listed-items/route.ts (ALL ITEMS LISTED BY DONOR)
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/Item";
import authorize from "@/lib/authorize";

// GET handler to fetch all items with isRequested = true
export async function GET(req: NextRequest) {
  try {
    const { userId } = await authorize(req);
    const { searchParams } = new URL(req.url);

    // Extract pagination parameters (default to page 1 and 12 items per page)
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "12", 10);

    const filter: any = { donor: userId };

    if (searchParams.get("status")) filter.status = searchParams.get("status");
    if (searchParams.get("category")) filter.category = searchParams.get("category");

    // Calculate the offset for pagination
    const skip = (page - 1) * limit;

    await connectToDatabase();

    // Fetch all items where isRequested = true
    const items = await Item.find(filter).skip(skip).limit(limit).sort({ createdAt: -1 }).populate("donor", "_id name email role");

    // If no items are found
    if (items.length === 0) {
      return NextResponse.json({ items: [], page, totalPages: 0, totalItems: 0 }, { status: 200 });
    }

    // Total count for pagination info
    const totalItems = await Item.countDocuments(filter);

    return NextResponse.json({
      items,
      page,
      totalPages: Math.ceil(totalItems / limit),
      totalItems: totalItems,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch requested items" }, { status: err.status || 500 });
  }
}
