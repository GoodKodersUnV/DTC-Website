"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { FaBusAlt } from "react-icons/fa";
import axios from "axios";

declare global {
  interface Window {
    google: any;
  }
}

interface Bus {
  id: string;
  from: string;
  to: string;
  waypoints: string[];
  plateNumber: string;
  liveLocation?: string;
}

const BusDetails = () => {
  const { id } = useParams();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [bus, setBus] = useState<Bus | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleMapsLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const handleFetchBusData = async () => {
    try {
      const response = await axios.post(`/api/trip/${id}`, { id });
      const data = response.data;

      const reqdata: Bus = {
        id: data.id,
        from: data.from.name,
        to: data.to.name,
        waypoints: data.wayPoints.map(
          (waypoint: any) => waypoint.location.name
        ),
        plateNumber: data.Vehicle.plateNumber,
        liveLocation: data.liveLocation[0].name || "",
      };

      setBus(reqdata);
    } catch (error) {
      console.error("Failed to fetch bus data", error);
    }
  };

  useEffect(() => {
    handleFetchBusData();
  }, []);

  useEffect(() => {
    const getCoordinates = async (location: string) => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          location
        )}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        return data.results[0].geometry.location;
      } else {
        console.error("Geocoding request failed due to", data.status);
        return null;
      }
    };

    const fetchAndInitializeMap = async () => {
      if (googleMapsLoaded && bus) {
        const waypointsWithCoords = await Promise.all(
          bus.waypoints.map(async (waypoint) => {
            const coords = await getCoordinates(waypoint);
            return coords ? { name: waypoint, ...coords } : null;
          })
        );

        const startCoords = await getCoordinates(bus.from);
        const endCoords = await getCoordinates(bus.to);
        const liveLocationCoords = await getCoordinates(bus.liveLocation || "");

        const validWaypoints = waypointsWithCoords.filter((coord) => coord);
        if (startCoords && endCoords) {
          const mapInstance = new window.google.maps.Map(mapRef.current!, {
            center: startCoords,
            zoom: 10,
          });

          validWaypoints.forEach((waypoint, index) => {
            let iconOptions;

            if (index === 0) {
              iconOptions = {
                url: "https://cdn-icons-png.flaticon.com/128/684/684908.png",
                scaledSize: new window.google.maps.Size(22, 22),
              };
            } else if (index === validWaypoints.length - 1) {
              iconOptions = {
                url: "https://cdn-icons-png.flaticon.com/128/16750/16750007.png",
                scaledSize: new window.google.maps.Size(22, 22),
              };
            } else {
              iconOptions = {
                url: "https://play-lh.googleusercontent.com/9VaPNnB-Z3vMgVuKCrEbTTxqg_70IzmzrH80wjwAcTLKlnRBmYedwel8mU3KWy0gpa9z",
                scaledSize: new window.google.maps.Size(12, 12),
              };
            }

            new window.google.maps.Marker({
              position: { lat: waypoint!.lat, lng: waypoint!.lng },
              map: mapInstance,
              title: waypoint!.name,
              icon: iconOptions,
            });
          });

          if (liveLocationCoords) {
            new window.google.maps.Marker({
              position: liveLocationCoords,
              map: mapInstance,
              title: "Live Location",
              icon: {
                url: "https://cdn-icons-png.flaticon.com/128/635/635705.png",
                scaledSize: new window.google.maps.Size(25, 25),
              },
            });
          }

          const directionsService = new window.google.maps.DirectionsService();
          const directionsRenderer = new window.google.maps.DirectionsRenderer({
            map: mapInstance,
            suppressMarkers: true,
          });

          const waypoints = validWaypoints.map((waypoint) => ({
            location: new window.google.maps.LatLng(waypoint!.lat, waypoint!.lng),
            stopover: true,
          }));

          directionsService.route(
            {
              origin: new window.google.maps.LatLng(
                startCoords.lat,
                startCoords.lng
              ),
              destination: new window.google.maps.LatLng(
                endCoords.lat,
                endCoords.lng
              ),
              waypoints,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result: any, status: any) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
              } else {
                console.error("Directions request failed due to", status);
              }
            }
          );
        }
      }
    };

    fetchAndInitializeMap();
  }, [googleMapsLoaded, bus]);

  if (!bus)
    return (
      <div className="p-6 text-center text-red-500">
        Finding buses for you...
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">Bus Details</h1>
      <pre className="p-4 bg-gray-100 text-gray-600 rounded-lg overflow-auto">
        {JSON.stringify(bus, null, 2)}
      </pre>
      <div className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
        <FaBusAlt className="text-green-800 h-7 w-7" />
        <h1>
          {bus.from} → {bus.to}
        </h1>
      </div>
      <div ref={mapRef} style={{ width: "100%", height: "80vh" }}></div>
    </div>
  );
};

export default BusDetails;
