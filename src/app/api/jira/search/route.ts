import { NextResponse } from "next/server";
import jiraFields from "@/config/jira-fields.json";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/lib/db";
import User from "@/models/User";
import { decrypt } from "@/lib/encryption";

export async function POST(req: Request) {
  try {
    const { jql, token: providedToken } = await req.json();
    let finalToken = providedToken;

    if (!finalToken) {
      const session = await getServerSession(authOptions);
      if (session?.user?.email) {
        await dbConnect();
        const user = await User.findOne({ email: session.user.email }).select("+jiraTokenEncrypted");
        if (user?.jiraTokenEncrypted) {
          finalToken = decrypt(user.jiraTokenEncrypted);
        }
      }
    }

    if (!jql || !finalToken) {
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
    const fullUrl = `${jiraUrl}/rest/api/2/search`;
    
    console.log(`[Jira Proxy] Fetching: ${fullUrl}`);

    try {
      const response = await fetch(fullUrl, {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${finalToken}`,
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jql: jql,
          fields: jiraFields,
          maxResults: 50,
        }),
      });

      console.log(`[Jira Proxy] Response Status: ${response.status} ${response.statusText}`);

      const contentType = response.headers.get("content-type");
      
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        
        if (!response.ok) {
          console.error(`[Jira Proxy] Jira Error Data:`, JSON.stringify(data));
          return NextResponse.json(
            { message: `Jira Error: ${response.status}`, details: data },
            { status: response.status }
          );
        }
        
        return NextResponse.json(data);
      } else {
        const text = await response.text();
        console.error(`[Jira Proxy] Non-JSON Response (${response.status}):`, text.slice(0, 500));
        return NextResponse.json(
          { 
            message: `Jira returned non-JSON response (${response.status})`, 
            details: text.slice(0, 200) 
          },
          { status: 502 } // Bad Gateway
        );
      }
    } catch (fetchError: any) {
      console.error(`[Jira Proxy] Fetch Exception:`, fetchError.message);
      return NextResponse.json(
        { message: "Failed to reach Jira server", error: fetchError.message },
        { status: 504 } // Gateway Timeout
      );
    }
  } catch (error: any) {
    console.error(`[Jira Proxy] Internal Route Error:`, error.message);
    return NextResponse.json(
      { message: error.message || "Something went wrong" },
      { status: 500 }
    );
  }
}
