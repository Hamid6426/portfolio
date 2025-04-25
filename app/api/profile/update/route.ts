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

    // Parse the JSON body
    const body = await req.json();

    // Fields that cannot be updated
    const excludedFields = [
      "password", 
      "role", 
      "isVerified", 
      "verifiedAt", 
      "verificationToken", 
      "verificationTokenExpire", 
      "profilePicture"
    ];

    // Update only the fields provided in the request body and that are not in the excludedFields list
    for (const key in body) {
      if (Object.prototype.hasOwnProperty.call(body, key) && !excludedFields.includes(key)) {
        user[key] = body[key];
      }
    }

    // Save the updated user to the database
    await user.save();

    // Exclude the restricted fields before returning the response\
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, role, isVerified, verifiedAt, verificationToken, verificationTokenExpire, profilePicture, ...remainingFields } = user.toObject();

    return NextResponse.json({ user: remainingFields }, { status: 200 });
  } catch (error: any) {
    console.error("Error updating account:", error);
    if (error.name === "JsonWebTokenError") {
      return NextResponse.json({ error: "Invalid token" }, { status: 403 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
