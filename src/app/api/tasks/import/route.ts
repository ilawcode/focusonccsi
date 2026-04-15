import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Task from "@/models/Task";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { issue } = await req.json();

    if (!issue || !issue.id) {
      return NextResponse.json({ message: "Invalid issue data" }, { status: 400 });
    }

    await dbConnect();

    // Get current user ID
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Upsert the task
    const task = await Task.findOneAndUpdate(
      { jiraId: issue.id },
      {
        jiraId: issue.id,
        key: issue.key,
        summary: issue.fields.summary,
        status: issue.fields.status?.name,
        assignedTo: user._id,
        originalData: issue,
      },
      { upsert: true, new: true }
    );

    return NextResponse.json(
      { message: "Task imported and assigned successfully", task },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
