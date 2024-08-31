import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request)  {
    try {
        const body = await req.json();
        console.log("**",body);
        const trip = await db.trip.create({
            data: {
                startAt: body.startAt,
                endAt: body.endAt,
                fromId: body.fromId,
                toId: body.toId,
                driverId: body.driverId,
                conductorId: body.conductorId,
                vehicleId: body.vehicleId,
            },
        });
        return NextResponse.json({ message: "Data received", body, status: 200 });
    } catch (error) {
        console.error("Error:", error);
        return NextResponse.json({ message: "An error occurred", status: 500 });
    }
}