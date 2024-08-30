import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    const locations = await db.location.findMany();
    const drivers = await db.user.findMany({
        where:{
            role:"DRIVER",
        }
    })
    const conductors = await db.user.findMany({
        where:{
            role:"CONDUCTOR",
        }
    })
    const buses = await db.vehicle.findMany();
    const trips = await db.trip.findMany();
    return NextResponse.json({ locations,drivers,buses,conductors,trips });
}