import { db } from "@/lib/db";

export const getTrips = async () => {
  try {
    const trips = await db.trip.findMany();
    return trips;
  } catch (e) {
    throw new Error("Trips not found");
  }
};

export const getTrip = async (id: string) => {
  try {
    const trip = await db.trip.findUnique({
      where: {
        id,
      },
    });
    return trip;
  } catch (e) {
    throw new Error("Trip not found");
  }
};

export const createTrip = async (data: any) => {
  try {
    const trip = await db.trip.create({
      data,
    });
    return trip;
  } catch (e) {
    throw new Error("Trip not created");
  }
};
