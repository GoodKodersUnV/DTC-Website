import { getAllLocations } from "@/actions/locations";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const locations = await getAllLocations();

    return NextResponse.json(locations, {
      status: 200,
    });
  } catch (e: any) {
    return NextResponse.json(
      {
        message: e.message,
      },
      {
        status: 500,
      }
    );
  }
}
