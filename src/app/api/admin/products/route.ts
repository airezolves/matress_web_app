import { NextResponse } from "next/server";

import { isAdminAuthorized } from "@/lib/admin-auth";
import { createProduct, type ProductInput } from "@/lib/db/products";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!(await isAdminAuthorized(request))) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
  }

  let input: ProductInput;
  try {
    input = (await request.json()) as ProductInput;
  } catch {
    return NextResponse.json({ success: false, message: "Invalid JSON body" }, { status: 400 });
  }

  const missing = (["id", "slug", "name", "brand", "category", "subcategory", "description", "thickness", "warranty"] as const).filter(
    (key) => !input?.[key]
  );

  if (missing.length) {
    return NextResponse.json(
      { success: false, message: `Missing required fields: ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  try {
    const product = await createProduct(input);
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch {
    return NextResponse.json({ success: false, message: "Failed to create product" }, { status: 500 });
  }
}
