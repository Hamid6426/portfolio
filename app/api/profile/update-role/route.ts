import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function PATCH(req: NextRequest) {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    await connectToDatabase();

    // Validate that the user exists
    const user = await User.findById(decoded.userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Parse the JSON body (should include the new role)
    const { newRole } = await req.json();

    // Validate the new role
    if (!newRole) {
      return NextResponse.json({ error: "User ID and new role are required" }, { status: 400 });
    }

    if (newRole !== "receiver" && newRole !== "donor") {
      return NextResponse.json({ error: "Invalid role. Valid roles are 'receiver' or 'donor'" }, { status: 400 });
    }

    // Find the user whose role is being updated
    const targetUser = await User.findById(decoded.userId);
    if (!targetUser) {
      return NextResponse.json({ error: "Target user not found" }, { status: 404 });
    }

    // Update the user's role
    targetUser.role = newRole;
    await targetUser.save();

    return NextResponse.json({ message: "Role updated successfully" }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating role:", error);
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
