import { NextResponse } from "next/server";

import { listProducts } from "@/lib/db/products";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const products = await listProducts();
    return NextResponse.json({ products }, { status: 200 });
  } catch {
    return NextResponse.json({ products: [], message: "Failed to load products" }, { status: 500 });
  }
}
