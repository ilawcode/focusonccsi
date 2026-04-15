import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Task from "@/models/Task";
import User from "@/models/User";

const ROLE_SORT_FIELD_MAP: Record<string, string> = {
  "BE Analist": "beAnalystDone",
  "BE Dev": "beDevDone",
  "Web Analist": "webAnalystDone",
  "Web Dev": "webDevDone",
  "Mobile Analist": "mobileAnalystDone",
  "Mobile Dev": "mobileDevDone",
  "Test": "testDone",
};

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    // Get current user and their role
    const user = await User.findOne({ email: session.user.email });
    if (!user || !user.role) {
      return NextResponse.json({ message: "User or role not found" }, { status: 403 });
    }

    const sortField = ROLE_SORT_FIELD_MAP[user.role];
    
    // Default to summary sort if role not mapped (shouldn't happen with valid roles)
    const sortConfig: any = sortField ? { [sortField]: 1 } : { summary: 1 };

    // Fetch all tasks, populate assignee, sort by role's deadline (nulls handled by MongoDB standard sorts, usually first, so let's adjust for that if needed, but standard 1 works for now or requires aggregation for complex nulls-last)
    // To ensure null dates are sorted last in MongoDB, we can use an aggregation or simple sort. Simple sort puts nulls first.
    // For a robust nulls-last sort, aggregation is best:
    const tasks = await Task.aggregate([
      {
        $addFields: {
          sortValue: {
            $ifNull: [`$${sortField}`, new Date("2999-12-31")] // Assign far future date to nulls
          }
        }
      },
      {
        $sort: { sortValue: 1 }
      },
      {
        $lookup: {
          from: "users",
          localField: "assignedTo",
          foreignField: "_id",
          as: "assignedTo"
        }
      },
      {
        $unwind: {
          path: "$assignedTo",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $project: {
          "assignedTo.password": 0 // Exclude password from populated user
        }
      }
    ]);


    return NextResponse.json({ tasks }, { status: 200 });

  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
