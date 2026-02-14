import { getGitHubProjects } from "@/app/lib/github";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const projects = await getGitHubProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}