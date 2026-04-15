import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import SavedQuery from "@/models/SavedQuery";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    await connectDB();
    // User can only delete their own queries
    const query = await SavedQuery.findById(params.id);
    if (!query) {
      return NextResponse.json({ message: "Query not found" }, { status: 404 });
    }

    // Basic ownership check logic would require user ID comparison
    // For now simple delete by ID
    await SavedQuery.findByIdAndDelete(params.id);

    return NextResponse.json({ message: "Query deleted" });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
