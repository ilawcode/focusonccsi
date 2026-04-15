import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import SavedQuery from "@/models/SavedQuery";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user.email });
  if (!user) return NextResponse.json({ message: "User not found" }, { status: 404 });

  const queries = await SavedQuery.find({ userId: user._id }).sort({ createdAt: -1 });
  return NextResponse.json(queries);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { name, jql } = await req.json();
  if (!name || !jql) {
    return NextResponse.json({ message: "Name and JQL are required" }, { status: 400 });
  }

  try {
    await dbConnect();
    const user = await User.findOne({ email: session.user.email });
    
    const newQuery = await SavedQuery.create({
      userId: user._id,
      name,
      jql,
    });

    return NextResponse.json(newQuery, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
