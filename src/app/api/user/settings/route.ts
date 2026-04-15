import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { encrypt } from "@/lib/encryption";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  await dbConnect();
  const user = await User.findOne({ email: session.user.email }).select("+jiraTokenEncrypted");
  
  return NextResponse.json({
    hasToken: !!user?.jiraTokenEncrypted,
  });
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { jiraToken } = await req.json();
  if (typeof jiraToken !== "string") {
    return NextResponse.json({ message: "Invalid token" }, { status: 400 });
  }

  try {
    await dbConnect();
    const encrypted = jiraToken ? encrypt(jiraToken) : null;
    
    await User.findOneAndUpdate(
      { email: session.user.email },
      { jiraTokenEncrypted: encrypted }
    );

    return NextResponse.json({ message: "Settings updated" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
