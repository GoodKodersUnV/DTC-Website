"use client";
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaBusAlt } from "react-icons/fa";

declare global {
  interface Window {
      google: any;
  }
}

interface Bus {
  id: number;
  startLocation: string;
  stopLocation: string;
  waypoints: string[];
  busNumber: string;
  liveLocation: string;
}

const BusDetails = () => {
  const busData: Bus[] = [
    {
      id: 1,
      startLocation: 'MG Bus Station',
      stopLocation: 'Kothakota Bus Station',
      waypoints: [
        'MG Bus Station',
        'Afzalgunj',
        'Aramghar',
        'Shadnagar',
        'Jadcherla',
        'Bhootpur',
        'Kothakota Bus Station',
      ],
      busNumber: 'TS07UM1388',
      liveLocation: 'Shamshabad',
    },
    {
      id: 2,
      startLocation: 'Secunderabad Junction',
      stopLocation: 'Warangal Bus Station',
      waypoints: [
        'Secunderabad Junction',
        'LB Nagar',
        'Jambagh',
        'Kazipet',
        'Warangal Bus Station',
      ],
      busNumber: 'TS08WB9922',
      liveLocation: 'Dilsukhnagar',
    },
    {
      id: 3,
      startLocation: 'Miyapur',
      stopLocation: 'Vijayawada Bus Station',
      waypoints: [
        'Miyapur',
        'Lakdikapul',
        'Guntur',
        'Vijayawada Bus Station',
      ],
      busNumber: 'AP09XY5544',
      liveLocation: 'Nampally',
    },
    {
      id: 4,
      startLocation: 'Bangalore',
      stopLocation: 'Chennai',
      waypoints: [
        'Bangalore',
        'Hosur',
        'Kanchipuram',
        'Chennai',
      ],
      busNumber: 'KA03LM7890',
      liveLocation: 'Krishnagiri',
    },
    {
      id: 5,
      startLocation: 'Kothakota Bus Station',
      stopLocation: 'MG Bus Station',
      waypoints: [
        'Kothakota Bus Station',
        'Bhootpur',
        'Jadcherla',
        'Shadnagar',
        'Aramghar',
        'Afzalgunj',
        'MG Bus Station',
      ],
      busNumber: 'TS07UM1388',
      liveLocation: 'Shamshabad',
    },
  ];

  const { id } = useParams();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
  const [bus, setBus] = useState<Bus | null>(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleMapsLoaded(true);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const busDetails = busData.find(bus => bus.id === parseInt(id as string));
    setBus(busDetails || null);
  }, [id]);

  useEffect(() => {
    const getCoordinates = async (location: string) => {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}`
      );
      const data = await response.json();
      if (data.status === 'OK') {
        return data.results[0].geometry.location;
      } else {
        console.error('Geocoding request failed due to', data.status);
        return null;
      }
    };

    const fetchAndInitializeMap = async () => {
      if (googleMapsLoaded && bus) {
        const waypointsWithCoords = await Promise.all(
          bus.waypoints.map(async waypoint => {
            const coords = await getCoordinates(waypoint);
            return coords ? { name: waypoint, ...coords } : null;
          })
        );

        const startCoords = await getCoordinates(bus.startLocation);
        const endCoords = await getCoordinates(bus.stopLocation);
        const liveLocationCoords = await getCoordinates(bus.liveLocation);

        const validWaypoints = waypointsWithCoords.filter(coord => coord);
        if (startCoords && endCoords && liveLocationCoords) {
          const mapInstance = new window.google.maps.Map(mapRef.current!, {
            center: { lat: validWaypoints[0]?.lat || 0, lng: validWaypoints[0]?.lng || 0 },
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
              position: { lat: waypoint.lat, lng: waypoint.lng },
              map: mapInstance,
              title: waypoint.name,
              icon: iconOptions,
            });
          });

          new window.google.maps.Marker({
            position: { lat: liveLocationCoords.lat, lng: liveLocationCoords.lng },
            map: mapInstance,
            title: 'Live Location',
            icon: {
              url: 'https://cdn-icons-png.flaticon.com/128/635/635705.png',
              scaledSize: new window.google.maps.Size(25, 25),
            },
          });

          const directionsService = new window.google.maps.DirectionsService();
          const directionsRenderer = new window.google.maps.DirectionsRenderer({
            map: mapInstance,
            suppressMarkers: true,
          });

          const waypoints = validWaypoints.map(waypoint => ({
            location: new window.google.maps.LatLng(waypoint.lat, waypoint.lng),
            stopover: true,
          }));

          directionsService.route(
            {
              origin: new window.google.maps.LatLng(startCoords.lat, startCoords.lng),
              destination: new window.google.maps.LatLng(endCoords.lat, endCoords.lng),
              waypoints,
              travelMode: window.google.maps.TravelMode.DRIVING,
            },
            (result:any, status:any) => {
              if (status === window.google.maps.DirectionsStatus.OK) {
                directionsRenderer.setDirections(result);
              } else {
                console.error('Directions request failed due to', status);
              }
            }
          );
        }
      }
    };

    fetchAndInitializeMap();
  }, [googleMapsLoaded, bus]);

  if (!bus) return <div className="p-6 text-center text-red-500">Finding buses for you...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex items-center gap-3 text-2xl font-bold text-gray-800 mb-4">
        <FaBusAlt className="text-green-800 h-7 w-7" />
        <h1>{bus.startLocation} → {bus.stopLocation}</h1>
      </div>
      <div ref={mapRef} style={{ width: '100%', height: '80vh' }}></div>
    </div>
  );
};

export default BusDetails;
