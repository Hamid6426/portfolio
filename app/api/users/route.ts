import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import authorize from "@/lib/authorize";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();
    const { userId } = await authorize(req);
    const userWithRole = await User.findById(userId).select("role");

    if (userWithRole.role !== "admin" && userWithRole.role !== "superadmin") {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    const users = await User.find({}).select("-password"); // Exclude password from response

    if (!users) {
      return NextResponse.json({ error: "No users are available" }, { status: 404 });
    }

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 403 });
  }
}
