import { NextResponse } from "next/server";

import { isAdminAuthorized } from "@/lib/admin-auth";
import { deleteProduct } from "@/lib/db/products";

export const dynamic = "force-dynamic";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await isAdminAuthorized(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const removed = await deleteProduct(id);
    if (!removed) {
      return NextResponse.json({ success: false, message: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true, id }, { status: 200 });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to delete product" }, { status: 500 });
  }
}
