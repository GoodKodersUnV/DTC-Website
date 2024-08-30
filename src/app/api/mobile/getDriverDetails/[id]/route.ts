import {
  getDriverTripDetails,
  getDriverTripDetailsByDate,
  getDriverTripDetailsByRange,
} from "@/actions/trip";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  {
    params,
  }: {
    params: {
      id: string;
    };
  }
) {
  try {
    const { id } = params;

    const { searchParams } = new URL(req.url);
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    console.log("Driver ID:", id);
    if (endDate && startDate) {
      const data = await getDriverTripDetailsByRange(id, startDate, endDate);
      return NextResponse.json(data);
    }

    if (startDate) {
      const data = await getDriverTripDetailsByDate(id, startDate);
      return NextResponse.json(data);
    }

    const data = await getDriverTripDetails(id);
    return NextResponse.json(data);
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
