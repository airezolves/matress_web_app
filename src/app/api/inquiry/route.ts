import { NextResponse } from "next/server";

import { inquiryService } from "@/services/inquiry-service";
import { inquirySchema } from "@/types/inquiry";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const json = (await request.json()) as { customer: unknown; productIds: unknown };

    const validatedCustomer = inquirySchema.safeParse(json.customer);
    if (!validatedCustomer.success) {
      return NextResponse.json(
        {
          success: false,
          message: "Validation failed",
          errors: validatedCustomer.error.flatten()
        },
        { status: 400 }
      );
    }

    if (!Array.isArray(json.productIds) || json.productIds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "At least one product is required in inquiry cart"
        },
        { status: 400 }
      );
    }

    const response = await inquiryService.submitInquiry({
      customer: validatedCustomer.data,
      productIds: json.productIds.filter((value): value is string => typeof value === "string")
    });

    if (!response.success) {
      return NextResponse.json(response, { status: 400 });
    }

    return NextResponse.json(response, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message: "Unexpected server error"
      },
      { status: 500 }
    );
  }
}
