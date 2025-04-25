import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import { writeFile, mkdir } from "fs/promises";
import path from "path";
import { existsSync } from "fs";

export async function PATCH(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify token and connect to database
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    await connectToDatabase();

    // Validate user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Parse the FormData
    const formData = await req.formData();
    const file: File | null = formData.get("profilePicture") as unknown as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: "Invalid file type. Only JPEG and PNG are allowed." }, { status: 400 });
    }

    // Convert the file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const fileName = `${user._id}-${timestamp}${path.extname(file.name)}`;

    // Save the file
    const uploadDir = path.join(process.cwd(), "public", "profilePictures");

    if (!existsSync(uploadDir)) {
      try {
        await mkdir(uploadDir, { recursive: true });
      } catch (error) {
        console.error("Error creating directory:", error);
        return NextResponse.json({ error: "Failed to create upload directory" }, { status: 500 });
      }
    }
    
    const filePath = path.join(uploadDir, fileName);
    await writeFile(filePath, buffer);

    // Generate relative URL for the image
    const imageUrl = `/profilePictures/${fileName}`;

    // Update user profile with new image URL
    user.profilePicture = imageUrl;
    await user.save();

    return NextResponse.json(
      {
        message: "Profile picture updated successfully",
        profilePicture: imageUrl,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating profile picture:", error);

    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }

    return NextResponse.json({ error: "Internal server error", details: error.message }, { status: 500 });
  }
}
