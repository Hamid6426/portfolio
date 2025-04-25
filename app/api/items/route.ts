import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongodb";
import Item from "@/models/Item";
import User from "@/models/User";
import authorize from "@/lib/authorize";

/*
create a new items at "api/items"
*/
export async function POST(req: NextRequest) {
  try {
    const { userId } = await authorize(req);
    const userWithRole = await User.findById(userId).select("role");

    if (userWithRole.role !== "donor") {
      throw { status: 403, message: "Access denied" };
    }
    await connectToDatabase();

    // Parse the request body
    const body = await req.json();
    if (!body) {
      return NextResponse.json({ error: "Request body is required" }, { status: 400 });
    }

    if (!body.title || !body.description || !body.quantity || !body.category || !body.condition) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (body.quantity <= 0) {
      return NextResponse.json({ error: "Quantity must be greater than 0" }, { status: 400 });
    }

    const item = await Item.create({ ...body, donor: userId });

    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    console.error(error);
    const status = error.status || 500;
    const message = error.message || "Internal Server Error";
    return NextResponse.json({ error: message }, { status });
  }
}

/*
get all the items by any user with a filter at "api/items"
*/
export async function GET(req: NextRequest) {
  await connectToDatabase();
  const { searchParams } = new URL(req.url);

  // Extract pagination parameters (default to page 1 and 12 items per page)
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = parseInt(searchParams.get("limit") || "12", 10);

  const filter: any = {};

  if (searchParams.get("status")) filter.status = searchParams.get("status");
  if (searchParams.get("category")) filter.category = searchParams.get("category");

  // Calculate the offset for pagination
  const skip = (page - 1) * limit;

  try {
    // Fetch the items with pagination and filtering
    const items = await Item.find(filter).skip(skip).limit(limit).populate("donor", "name email").populate("receiver", "name email").lean();;

    // Get the total count of items for pagination
      const totalItems = await Item.countDocuments(filter);

    return NextResponse.json(
      {
        items,
        totalItems,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to fetch items" }, { status: 500 });
  }
}
