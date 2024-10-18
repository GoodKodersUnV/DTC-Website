"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const TripsPage = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    handleGetAllTrips();
  }, []);

  const handleGetAllTrips = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/trip/all");
      console.log(res.data);
      setTrips(res.data);
    } catch (error) {
      toast.error("Failed to fetch trips");
      console.error("Failed to fetch trips", error);
    } finally {
      setLoading(false);
    }
  };

  const handleTripClick = (id: string) => {
    router.push(`./waypoints/${id}`);
  };

  const getCode = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <h1 className="text-3xl font-bold mb-6 text-white">All Trips</h1>
      {loading ? (
        <p className="text-white">Loading trips...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trips.map((trip: any) => (
            <div
              key={trip.id}
              onClick={() => handleTripClick(trip.id)}
              className="p-4 bg-blue-600 shadow-md rounded-lg cursor-pointer hover:bg-blue-500 flex items-center justify-center"
            >
              <div className="flex items-center justify-center ">
                <h2 className="text-xl font-semibold text-emerald-400">
                  {getCode(trip.from.name)}
                </h2>
                <div className="mx-4 text-white text-sm font-semibold">
                  ➤ {trip.Vehicle.plateNumber} ➤
                </div>
                <h2 className="text-xl font-semibold text-red-500">
                  {getCode(trip.to.name)}
                </h2>
              </div>
              <p className="text-gray-200">{trip.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TripsPage;
