import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import User from "@/models/User";
import { decrypt } from "@/lib/encryption";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    const user = await User.findOne({ email: session.user.email }).select("+jiraTokenEncrypted");
    
    if (!user?.jiraTokenEncrypted) {
      return NextResponse.json({ token: null });
    }

    const decryptedToken = decrypt(user.jiraTokenEncrypted);
    return NextResponse.json({ token: decryptedToken });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
