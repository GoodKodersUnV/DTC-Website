import { db } from "@/lib/db";

export const getTrips = async () => {
  try {
    const trips = await db.trip.findMany({
      include : {
        from : true,
        to:true,
        driver:true
      }
    });
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
        include : {
          driver:true,
          from : true,
          to : true,
          wayPoints : true,
          liveLocation:true,
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
