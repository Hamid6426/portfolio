import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import authorize from "@/lib/authorize";

export async function GET(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  try {
    const { userId } = await params;
    await connectToDatabase();

    // Fetch the target user from the database
    const user = await User.findById(userId).select("-password");

    // Handle case where the user is not found
    if (!user) {
      return NextResponse.json({ error: "No users are available" }, { status: 404 });
    }

    // Return the user data
    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);

    // Handle generic errors
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Authorize the user making the request
    const { userId } = await authorize(req);
    const userWithRole = await User.findById(userId).select("role");

    // Check if the user has the required permissions
    if (!userWithRole || (userWithRole.role !== "admin" && userWithRole.role !== "superadmin")) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    // Parse the request body
    const body = await req.json();
    if (!body || !body.userId || !body.updateData) {
      return NextResponse.json({ error: "User ID and update data are required" }, { status: 400 });
    }

    const targetUserId = body.userId;
    const updateData = body.updateData;

    // Fetch the target user from the database
    const user = await User.findById(targetUserId);

    // Handle case where the user is not found
    if (!user) {
      return NextResponse.json({ error: "No users are available" }, { status: 404 });
    }

    // Update the user's data
    Object.assign(user, updateData);
    await user.save();

    // Return the updated user data
    return NextResponse.json({ message: "User updated successfully", user }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);

    // Handle generic errors
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
export async function DELETE(req: NextRequest) {
  try {
    // Connect to the database
    await connectToDatabase();

    // Authorize the user making the request
    const { userId } = await authorize(req);
    const userWithRole = await User.findById(userId).select("role");

    // Check if the user has the required permissions
    if (!userWithRole || (userWithRole.role !== "admin" && userWithRole.role !== "superadmin")) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    // Parse the request body
    const body = await req.json();
    if (!body || !body.userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    const targetUserId = body.userId;

    // Fetch the target user from the database
    const user = await User.findById(targetUserId);

    // Handle case where the user is not found
    if (!user) {
      return NextResponse.json({ error: "No users are available" }, { status: 404 });
    }

    // Delete the user from the database
    await User.deleteOne({ _id: targetUserId });

    // Return a success message
    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);

    // Handle generic errors
    return NextResponse.json({ error: "An unexpected error occurred" }, { status: 500 });
  }
}
