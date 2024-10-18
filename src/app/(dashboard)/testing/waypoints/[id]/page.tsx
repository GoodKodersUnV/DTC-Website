'use client'

import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useParams } from "next/navigation";
import { ChevronRight, MapPin } from "lucide-react";

const TripDetailsPage = () => {
  const params = useParams();
  const { id } = params;
  const [trip, setTrip] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      handleGetTripDetails(id);
      handleGetAllLocations();
    }
  }, [id]);

  const handleGetTripDetails = async (tripId : string) => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/trip/${tripId}`, { id: tripId });
      setTrip(res.data);
    } catch (error) {
      toast.error("Failed to fetch trip details");
      console.error("Failed to fetch trip details", error);
    } finally {
      setLoading(false);
    }
  };

  const handleGetAllLocations = async () => {
    setLoading(true);
    try {
      const res = await axios.get("/api/locations/all");
      setLocations(res.data);
    } catch (error) {
      toast.error("Failed to fetch locations");
      console.error("Failed to fetch locations", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddWaypointToTrip = async (locationId : string ) => {
    setLoading(true);
    try {
      const res = await axios.post(`/api/trip/${id}/waypoint/${locationId}`);
      setTrip(res.data);
      toast.success("Waypoint added successfully!");
    } catch (error) {
      toast.error("Failed to add waypoint");
      console.error("Failed to add waypoint", error);
    } finally {
      setLoading(false);
    }
  };

  const Waypoint = ({ location }:any) => {
    const [{ isDragging }, drag] = useDrag({
      type: "location",
      item: { id: location.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={drag}
        className={`p-3 bg-blue-100 rounded-lg mb-2 cursor-move transition-all duration-300 ${
          isDragging ? "opacity-50" : "opacity-100"
        } hover:shadow-md hover:bg-blue-200`}
      >
        <div className="flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-blue-500" />
          <span>{location.name}</span>
        </div>
      </div>
    );
  };

  const TripWaypoint = ({ waypoint, isLast }:{
    waypoint: any;
    isLast?: boolean;
  }) => {
    return (
      <div className="flex items-center mb-4">
        <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
          {waypoint.name.charAt(0)}
        </div>
        <div className="ml-4 flex-grow">
          <p className="font-semibold text-lg">{waypoint.name}</p>
          <p className="text-sm text-gray-500">
            {waypoint.latitude}, {waypoint.longitude}
          </p>
        </div>
        {!isLast && (
          <div className="h-12 w-px bg-green-300 absolute left-4 top-8 z-0"></div>
        )}
      </div>
    );
  };

  const DropTarget = () => {
    const [{ isOver }, drop] = useDrop({
      accept: "location",
      drop: (item) => handleAddWaypointToTrip(item.id),
      collect: (monitor) => ({
        isOver: !!monitor.isOver(),
      }),
    });

    return (
      <div
        ref={drop}
        className={`p-6 border-2 border-dashed rounded-lg transition-all duration-300 ${
          isOver
            ? "border-green-500 bg-green-100"
            : "border-blue-300 hover:border-blue-500"
        }`}
      >
        <p className="text-center text-lg font-semibold">
          {isOver ? "Drop to Add" : "Drop Locations Here to Add to Trip"}
        </p>
      </div>
    );
  };

  const filteredLocations = locations.filter(
    (location) =>
      !trip?.waypoints?.some((waypoint) => waypoint.location.id === location.id)
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-gray-100 p-8 flex">
        <div className="w-1/3 bg-white rounded-lg shadow-lg p-6 mr-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            Trip Itinerary
          </h2>
          {loading ? (
            <p className="text-gray-600">Loading trip details...</p>
          ) : trip ? (
            <div className="relative">
              <TripWaypoint waypoint={trip.from.name} />
              {trip.waypoints?.map((waypoint : any, index : number) => (
                <TripWaypoint
                  key={waypoint.id}
                  waypoint={waypoint.location}
                  isLast={index === trip.waypoints.length - 1}
                />
              ))}
              <TripWaypoint waypoint={trip?.to.name} isLast={true} />
            </div>
          ) : (
            <p className="text-gray-600">No trip found</p>
          )}
        </div>

        <div className="flex-1 bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">
            Trip Details
          </h1>
          <DropTarget />
          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-700">
              Available Locations
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {filteredLocations.map((location) => (
                <Waypoint key={location.id} location={location} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </DndProvider>
  );
};

export default TripDetailsPage;
