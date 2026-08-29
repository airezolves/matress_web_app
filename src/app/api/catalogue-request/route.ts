import { NextResponse } from "next/server";

import { inquiryService } from "@/services/inquiry-service";
import { catalogueRequestSchema } from "@/types/inquiry";

export async function POST(request: Request) {
  try {
    const validated = catalogueRequestSchema.safeParse(await request.json());

    if (!validated.success) {
      return NextResponse.json(
        { success: false, message: "Please check the form details and try again." },
        { status: 400 }
      );
    }

    const response = await inquiryService.submitCatalogueRequest(validated.data);
    return NextResponse.json(
      { ...response, downloadUrl: "/files/Restolex-Catalogue.pdf" },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { success: false, message: "Unable to process your request right now." },
      { status: 500 }
    );
  }
}