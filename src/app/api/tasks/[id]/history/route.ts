import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "@/lib/db";
import AuditLog from "@/models/AuditLog";
import User from "@/models/User";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }


    await dbConnect();

    const logs = await AuditLog.find({ taskId: id })
      .populate("userId", "name surname email")
      .sort({ createdAt: -1 });

    return NextResponse.json(logs);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
