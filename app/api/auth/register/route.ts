// share-and-care/src/app/api/register/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import sendMail from "@/lib/sendMail";

export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { name, email, password } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    // Connect to the database
    await connectToDatabase();

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a verification token
    const verificationToken = Math.random().toString(36).substring(2, 15); // Simple random token generation
    const verificationTokenExpire = new Date();
    verificationTokenExpire.setHours(verificationTokenExpire.getHours() + 1); // Token valid for 1 hour

    // Create a new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpire,
    });

    // Save the user to the database
    await newUser.save();

    // Build the email HTML
    const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL}/verify-email?verificationToken=${verificationToken}`;
    const emailHtml = `
    <h1>Email Verification</h1>
    <p>Click the link below to verify your email:</p>
    <a href="${verificationLink}">${verificationLink}</a>
    <p>This link will expire in 1 hour.</p>
    `;

    // Send the verification email
    await sendMail(email, "Verify your email", emailHtml);

    // Respond with success
    return NextResponse.json({ message: "User registered successfully. Please verify your email." }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
