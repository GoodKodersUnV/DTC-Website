import { db } from "@/lib/db";

export const getTrips = async () => {
  try {
    const trips = await db.trip.findMany({
      include: {
        from: true,
        to: true,
        driver: true,
        wayPoints: true,
        Vehicle: true,
      },
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
      include: {
        from: true,
        to: true,
        wayPoints: {
          include: {
            location: true,
          },
        },
        liveLocation: true,
        Vehicle: true,
      },
    });

    return trip;
  } catch (e) {
    throw new Error("Trip not found");
  }
};

export const getDriverTripDetails = async (username: string) => {
  try {
    const trip = await db.trip.findMany({
      where: {
        driver: {
          username: username.toUpperCase(),
        },
      },
      include: {
        from: true,
        to: true,
        Vehicle: true,
        conductor: true,
      },
    });
    return trip;
  } catch (e) {
    throw new Error("Trip not found");
  }
};

export const getDriverTripDetailsByDate = async (
  username: string,
  date: string
) => {
  try {
    const trip = await db.trip.findMany({
      where: {
        driver: {
          username: username.toUpperCase(),
        },
        startAt: {
          gte: new Date(date),
          lt: new Date(date + "T23:59:59"),
        },
      },
      include: {
        from: true,
        to: true,
        Vehicle: true,
        conductor: true,
      },
    });
    return trip;
  } catch (e) {
    throw new Error("Trip not found");
  }
};

export const getDriverTripDetailsByRange = async (
  username: string,
  startDate: string,
  endDate: string
) => {
  try {
    const trip = await db.trip.findMany({
      where: {
        driver: {
          username: username.toUpperCase(),
        },
        startAt: {
          gte: new Date(startDate),
        },
        endAt: {
          lte: new Date(endDate),
        },
      },
      include: {
        from: true,
        to: true,
        Vehicle: true,
        conductor: true,
      },
    });
    return trip;
  } catch (e) {
    throw new Error("Trip not found");
  }
};

export const addWayPointToTrip = async (tripId: string, locationId: string) => {
  try {
    const trip = await db.trip.update({
      where: {
        id: tripId,
      },
      data: {
        wayPoints: {
          connect: {
            id: locationId,
          },
        },
      },
    });
    return trip;
  } catch (e) {
    throw new Error("Trip not found");
  }
};
