import { addLocations } from "@/actions/locations";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const {name,latitude,longitude} = await request.json();

    if(!name || !latitude || !longitude){
      return NextResponse.json({message: "Please enter all fields"}, { status: 400 });
    }
    
    const locations = {
      name,
      latitude,
      longitude
    };
    const res = await addLocations(locations);

    return NextResponse.json(res, { status: 200 });
  } catch (e) {
    return NextResponse.json(e, { status: 500 });
  }
}
