import { getLocation } from "@/actions/locations";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { id } = await request.json();
    
    const location = await getLocation(id);

    return NextResponse.json(location, {
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
