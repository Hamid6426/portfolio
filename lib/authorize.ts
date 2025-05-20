import { NextRequest } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import jwt, { JwtPayload } from "jsonwebtoken";

type AuthError = {
  status: number;
  message: string;
};

async function authorize(req: NextRequest): Promise<{ userId: string }> {
  const auth = req.headers.get("Authorization") || "";

  console.log("Incoming Authorization Header:", auth);

  if (!auth || !auth.startsWith("Bearer ")) {
    console.warn("No Bearer token found in Authorization header.");
    throw { status: 401, message: "Unauthorized" } satisfies AuthError;
  }

  const token = auth.replace("Bearer ", "").trim();

  if (!token) {
    console.warn("Empty token after stripping Bearer.");
    throw { status: 401, message: "Token missing or malformed" } satisfies AuthError;
  }

  let decoded: JwtPayload & { userId: string };
  try {
    const result = jwt.verify(token, process.env.JWT_SECRET!);
    if (typeof result === "string" || !("userId" in result)) {
      throw new Error("Invalid token payload");
    }
    decoded = result as JwtPayload & { userId: string };
    console.log("Token successfully verified. Decoded payload:", decoded);
  } catch (err) {
    console.error("Token verification failed:", err);
    throw { status: 403, message: "Invalid token" } satisfies AuthError;
  }

  await connectToDatabase();

  const user = await User.findById(decoded.userId).select("_id").lean();
  if (!user) {
    console.warn("No user found for token payload:", decoded.userId);
    throw { status: 404, message: "User not found" } satisfies AuthError;
  }

  return { userId: decoded.userId };
}

export default authorize;
