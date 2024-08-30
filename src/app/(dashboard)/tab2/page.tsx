"use client";
import { useRouter } from 'next/navigation';
import { FaBusAlt } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { IoMdSwap } from "react-icons/io";

interface Bus {
  id: number;
  startLocation: string;
  stopLocation: string;
  waypoints: string[];
  liveLocation: string;
}

interface FormData {
  start: string;
  end: string;
}

const Page = () => {
  const router = useRouter();
  const { register, watch } = useForm<FormData>();

  const busData = [
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

  const [filteredBusData, setFilteredBusData] = useState<Bus[]>(busData);

  const handleClick = (busId: number) => {
    router.push(`/tab2/${busId}`);
  };

  const startLocation = watch('start', '');
  const endLocation = watch('end', '');

  useEffect(() => {
    const filtered = busData.filter(bus => 
      (bus.startLocation.toLowerCase().includes(startLocation.toLowerCase()) ||
      bus.waypoints.some(waypoint => waypoint.toLowerCase().includes(startLocation.toLowerCase()))) &&
      (bus.stopLocation.toLowerCase().includes(endLocation.toLowerCase()) ||
      bus.waypoints.some(waypoint => waypoint.toLowerCase().includes(endLocation.toLowerCase())))
    );
    setFilteredBusData(filtered);
  }, [startLocation, endLocation]);

  return (
    <div className="p-6 bg-gradient-to-r from-white to-gray-200 min-h-screen">
      <div className="mb-6">
        <form className="flex gap-4 items-center">
          <input 
            type="text" 
            placeholder="Start Location" 
            {...register('start')} 
            className="p-2 border bg-white text-gray-800 border-gray-300 rounded-lg flex-1"
          />
          <IoMdSwap className="text-gray-800 h-6 w-6"/>
          <input 
            type="text" 
            placeholder="End Location" 
            {...register('end')} 
            className="p-2 border bg-white text-gray-800 border-gray-300 rounded-lg flex-1"
          />
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredBusData.map((bus) => (
          <div
            key={bus.id}
            className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleClick(bus.id)}
          >
            <div className="flex justify-center items-center space-x-3 mb-2">
              <FaBusAlt className="text-green-800 h-6 w-6"/>
              <div className="text-lg font-semibold text-gray-700">
                <strong>{bus.startLocation}</strong> 
                <span className="text-gray-500"> → </span> 
                <strong>{bus.stopLocation}</strong>
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="flex justify-between mb-1">
                <div className="text-gray-600">
                  Departure: <span className="font-medium text-gray-800">20:10</span>
                </div>
                <div className="text-gray-600">
                  Arrival: <span className="font-medium text-gray-800">10:30</span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-600">
                  <span className="font-medium text-gray-800">TS1957883</span>
                </div>
                <div className="text-gray-600">
                  <span className="font-medium text-gray-800">DTC</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;
