import { getTrips } from "@/actions/trip";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const trips = await getTrips();

    return NextResponse.json(trips, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        error: "Trips not found",
      },
      { status: 404 }
    );
  }
}
