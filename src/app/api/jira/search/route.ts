import { NextResponse } from "next/server";
import jiraFields from "@/config/jira-fields.json";

export async function POST(req: Request) {
  try {
    const { jql, token } = await req.json();

    if (!jql || !token) {
      return NextResponse.json(
        { message: "JQL and Token are required" },
        { status: 400 }
      );
    }

    const jiraUrl = process.env.JIRA_INSTANCE_URL;
    if (!jiraUrl) {
      return NextResponse.json(
        { message: "Jira Instance URL not configured" },
        { status: 500 }
      );
    }

    // Prepare fields from config
    const fields = jiraFields.join(",");

    const response = await fetch(`${jiraUrl}/rest/api/3/search`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        jql: jql,
        fields: jiraFields,
        maxResults: 50,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { message: "Jira API error", details: errorData },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
