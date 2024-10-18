import { addWayPointToTrip } from "@/actions/trip";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
  request: NextRequest,
  params: { id: string; wayID: string }
) {
  try {
    const { id, wayID } = params;
    console.log(id, wayID);

    const res = await addWayPointToTrip(id, wayID);

    return NextResponse.json(res, {
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
