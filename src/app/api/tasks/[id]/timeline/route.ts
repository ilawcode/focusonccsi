import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import Task from "@/models/Task";
import User from "@/models/User";
import AuditLog from "@/models/AuditLog";

const ROLE_FIELDS_MAP: Record<string, string[]> = {
  "BE Analist": ["beAnalystStart", "beAnalystDone"],
  "BE Dev": ["beDevStart", "beDevDone"],
  "Web Analist": ["webAnalystStart", "webAnalystDone"],
  "Web Dev": ["webDevStart", "webDevDone"],
  "Mobile Analist": ["mobileAnalystStart", "mobileAnalystDone"],
  "Mobile Dev": ["mobileDevStart", "mobileDevDone"],
  "Test": ["testStart", "testDone"],
};

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();

    await dbConnect();

    // Get current user and their role
    const user = await User.findOne({ email: session.user.email });
    if (!user || !user.role) {
      return NextResponse.json({ message: "User or role not found" }, { status: 403 });
    }

    const allowedFields = ROLE_FIELDS_MAP[user.role];
    if (!allowedFields) {
      return NextResponse.json({ message: "Unauthorized role for timeline updates" }, { status: 403 });
    }

    // Identify which fields in the body are allowed for this role
    const updates: Record<string, any> = {};
    const auditEntries: any[] = [];

    const task = await Task.findById(id);
    if (!task) {
      return NextResponse.json({ message: "Task not found" }, { status: 404 });
    }

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        const newValue = body[field] ? new Date(body[field]) : null;
        const oldValue = task[field];

        // Only update and log if value changed
        if (
          (oldValue === null && newValue !== null) ||
          (oldValue !== null && newValue === null) ||
          (oldValue && newValue && oldValue.getTime() !== newValue.getTime())
        ) {
          
          // Enforce reason if modifying an existing date
          let reasonText = null;
          if (oldValue !== null) {
            if (!body.reason || body.reason.length < 100) {
              return NextResponse.json({ 
                message: "A justification of at least 100 characters is required when modifying an existing date." 
              }, { status: 400 });
            }
            reasonText = body.reason;
          }

          updates[field] = newValue;
          auditEntries.push({
            taskId: id,
            userId: user._id,
            field,
            oldValue,
            newValue,
            reason: reasonText,
          });
        }
      }
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ message: "No valid changes for your role" }, { status: 400 });
    }

    // Save Audit Logs first
    await AuditLog.insertMany(auditEntries);

    // Apply updates to Task
    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true });

    return NextResponse.json(
      { message: "Timeline updated and audited successfully", task: updatedTask },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
