// app/api/mail/route.ts
import { NextResponse } from "next/server";
import Mail from "@/models/Mail";
import connectToDatabase from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const body = await req.json();

    const saved = await Mail.create(body);

    return NextResponse.json({ success: true, data: saved }, { status: 201 });
  } catch (error) {
    console.error("POST /api/mail error:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
