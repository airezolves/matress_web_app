import { NextResponse } from "next/server";

import { isAdminAuthorized } from "@/lib/admin-auth";
import { listInquiries } from "@/lib/db/inquiries";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!(await isAdminAuthorized(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const inquiries = await listInquiries();
    return NextResponse.json({ success: true, inquiries }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to load inquiries" }, { status: 500 });
  }
}
