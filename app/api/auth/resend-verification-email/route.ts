import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(req: NextRequest) {
  try {
    const { verificationToken } = await req.json();

    if (!verificationToken) {
      return NextResponse.json({ error: "Verification token is required" }, { status: 400 });
    }

    await connectToDatabase();

    // Find user with the given token and check if token is still valid
    const user = await User.findOne({
      verificationToken,
      verificationTokenExpire: { $gt: new Date() },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid or expired verification token" }, { status: 400 });
    }

    // Mark the user as verified
    user.isVerified = true;
    user.verifiedAt = new Date();
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;
    await user.save();

    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });

  } catch (error) {
    console.error("Email verification error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
