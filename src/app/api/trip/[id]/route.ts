import { getTrip } from "@/actions/trip";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { id } = await request.json();
    const trip = await getTrip(id);

    return NextResponse.json(trip, { status: 200 });
  } catch (e) {
    return NextResponse.json(
      {
        error: "Trip not found",
      },
      { status: 404 }
    );
  }
}
