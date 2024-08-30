import { addLocations } from "@/actions/locations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const locations = await request.json();

    const res = await addLocations(locations);

    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
