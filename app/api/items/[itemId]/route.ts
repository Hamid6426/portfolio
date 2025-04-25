import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/Item";
import authorize from "@/lib/authorize";
import User from "@/models/User";

export async function GET(request: Request, { params }: { params: Promise<{ itemId: string }> }) {
  try {
    const { itemId } = await params; // params should be awaited before using its properties
    await connectToDatabase();

    const item = await Item.findById(itemId).populate("donor", "name email").populate("receiver", "name email");
    if (!item) throw { status: 404, message: "Item not found" };

    return NextResponse.json(item, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch item" }, { status: err.status || 500 });
  } 
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ itemId: string }> }) {
  try {
    await connectToDatabase();

    const { userId } = await authorize(req);
    const userWithRole = await User.findById(userId).select("role");

    if (userWithRole.role !== "donor") {
      throw { status: 403, message: "Access denied" };
    }

      const { itemId } = await params;
    const item = await Item.findById(itemId);
    if (!item) throw { status: 404, message: "Item not found" };

    await item.deleteOne();
    return NextResponse.json({ message: "Deleted successfully" }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to delete item" }, { status: err.status || 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ itemId: string }> }) {
  try {
    await connectToDatabase();

    const { userId } = await authorize(req);
    const userWithRole = await User.findById(userId).select("role");

    if (userWithRole.role !== "donor") {
      throw { status: 403, message: "Access denied" };
    }

    const { itemId } = await params;
    const item = await Item.findById(itemId);
    if (!item) throw { status: 404, message: "Item not found" };

    const updates = await req.json();
    Object.assign(item, updates);
    await item.save();
    return NextResponse.json(item, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update" }, { status: err.status || 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ itemId: string }> }) {
  try {
    await connectToDatabase();

    const { userId } = await authorize(req);
    const userWithRole = await User.findById(userId).select("role");

    if (userWithRole.role !== "donor") {
      throw { status: 403, message: "Access denied" };
    }

    const { itemId } = await params;
    const item = await Item.findById(itemId);
    if (!item) throw { status: 404, message: "Item not found" };

    const patches = await req.json();
    Object.assign(item, patches);
    await item.save();
    return NextResponse.json(item, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to update" }, { status: err.status || 500 });
  }
}
