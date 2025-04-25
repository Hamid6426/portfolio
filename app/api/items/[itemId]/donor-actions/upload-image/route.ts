import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/Item";
import User from "@/models/User";
import { mkdir, writeFile } from "fs/promises";
import path from "path";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ itemId: string }> }) {
  // 1) Auth check
  const auth = req.headers.get("Authorization") || "";
  if (!auth.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const token = auth.replace("Bearer ", "");
  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }

  // 2) Connect & fetch both user and item
  await connectToDatabase();
  const user = await User.findById(decoded.userId);
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }
  const { itemId } = await params;

  const item = await Item.findById(itemId);
  if (!item) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  // 3) Permission: only donor or admin/superadmin
  if (item.donor.toString() !== decoded.userId && user.role !== "admin" && user.role !== "superadmin") {
    return NextResponse.json({ error: "Not permitted to upload images for this item" }, { status: 403 });
  }

  // 4) Parse multipart form
  const formData = await req.formData();
  const file = formData.get("itemImage") as File;
  if (!file) {
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
  }

  // 5) Validate type & convert
  const allowed = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowed.includes(file.type)) {
    return NextResponse.json({ error: "Only JPEG/PNG allowed" }, { status: 400 });
  }
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // 6) Ensure directory exists
  const uploadDir = path.join(process.cwd(), "public", "uploads", "items", itemId);
  await mkdir(uploadDir, { recursive: true });

  // 7) Unique filename
  const ext = path.extname(file.name);
  const fileName = `${Date.now()}${ext}`;
  const filePath = path.join(uploadDir, fileName);
  await writeFile(filePath, buffer);

  // 8) Save URL in item.images
  const imageUrl = `/uploads/items/${itemId}/${fileName}`;
  item.images.push(imageUrl);

  if (item.images.length > 4) {
    return NextResponse.json({ error: "Cannot add more than 4 images" }, { status: 400 });
  }

  await item.save();

  return NextResponse.json({ message: "Image added", imageUrl }, { status: 200 });
}
