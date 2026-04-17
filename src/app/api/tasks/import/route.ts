import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Task from "@/models/Task";
import User from "@/models/User";

import jiraDateMapping from "@/config/jira-date-mapping.json";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const issues = body.issues || (body.issue ? [body.issue] : []);

    if (issues.length === 0) {
      return NextResponse.json({ message: "No issue data provided" }, { status: 400 });
    }

    await dbConnect();

    // Get current user ID
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ message: "User not found!" }, { status: 404 });
    }

    const results = [];

    for (const issue of issues) {
      // Prepare mapping-based dates
      const mappedDates: any = {};
      
      // Only pre-fill if the task doesn't exist yet to avoid overwriting local changes
      const existingTask = await Task.findOne({ jiraId: issue.id });

      if (!existingTask) {
        Object.entries(jiraDateMapping).forEach(([localField, jiraField]) => {
          if (jiraField && issue.fields[jiraField]) {
            const dateValue = new Date(issue.fields[jiraField]);
            if (!isNaN(dateValue.getTime())) {
              mappedDates[localField] = dateValue;
            }
          }
        });
      }

      const updateData = {
        jiraId: issue.id,
        key: issue.key,
        summary: issue.fields.summary,
        description: issue.fields.description,
        type: issue.fields.issuetype?.name,
        status: issue.fields.status?.name,
        assignedTo: user._id,
        originalData: issue,
        ...mappedDates,
      };

      const task = await Task.findOneAndUpdate(
        { jiraId: issue.id },
        updateData,
        { upsert: true, new: true }
      );
      results.push(task);
    }

    return NextResponse.json(
      { 
        message: `${results.length} task(s) imported and assigned successfully`, 
        count: results.length,
        tasks: results 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Import Error:", error);
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
