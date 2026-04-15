import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { role } = await req.json();

    const validRoles = ["BE Analist", "BE Dev", "Web", "Mobile"];
    if (!validRoles.includes(role)) {
      return NextResponse.json({ message: "Invalid role" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      { role },
      { new: true }
    );

    return NextResponse.json(
      { message: "Role updated successfully", role: user.role },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
