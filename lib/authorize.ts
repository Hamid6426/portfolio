import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

async function authorize(req: NextRequest) {
  const auth = req.headers.get("Authorization") || "";

  console.log("Incoming Authorization Header:", auth);

  if (!auth || !auth.startsWith("Bearer ")) {
    console.warn("No Bearer token found in Authorization header.");
    const error = new Error("Unauthorized");
    (error as any).status = 401;
    throw error;
  }

  const token = auth.replace("Bearer ", "").trim();

  if (!token) {
    console.warn("Empty token after stripping Bearer.");
    throw { status: 401, message: "Token missing or malformed" };
  }

  let decoded: any;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
    console.log("Token successfully verified. Decoded payload:", decoded);
  } catch (err) {
    console.error("Token verification failed:", err);
    throw { status: 403, message: "Invalid token" };
  }

  await connectToDatabase();

  const user = await User.findById(decoded.userId).select("_id");
  if (!user) {
    console.warn("No user found for token payload:", decoded.userId);
    throw { status: 404, message: "User not found" };
  }

  return { userId: decoded.userId };
}

export default authorize;
