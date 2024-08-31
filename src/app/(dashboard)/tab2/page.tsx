"use client";
import { useRouter } from "next/navigation";
import { FaBusAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { IoMdSwap } from "react-icons/io";
import axios from "axios";
import { set } from "zod";

interface Bus {
  id: number;
  from: string;
  to: string;
  waypoints: string[];
  liveLocation: string;
  plateNumber: string;
}

interface FormData {
  start: string;
  end: string;
}

const Page = () => {
  const router = useRouter();
  const { register, watch } = useForm<FormData>();
  const [busData, setBusData] = useState<Bus[]>([]);

  // const busData: Bus[] = [
  //   {
  //     id: 1,
  //     from: 'MG Bus Station',
  //     to: 'Kothakota Bus Station',
  //     waypoints: [
  //       'MG Bus Station',
  //       'Afzalgunj',
  //       'Aramghar',
  //       'Shadnagar',
  //       'Jadcherla',
  //       'Bhootpur',
  //       'Kothakota Bus Station',
  //     ],
  //     plateNumber: 'TS07UM1388',
  //     liveLocation: 'Shamshabad',
  //   },
  // ];

  const [filteredBusData, setFilteredBusData] = useState<Bus[]>(busData);

  const handleClick = (busId: number) => {
    router.push(`/tab2/${busId}`);
  };

  const handleFetchBusData = async () => {
    try {
      const response = await axios.get("/api/trip/all");
      console.log(response.data);
      setBusData(response.data);
      setFilteredBusData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleFetchBusData();
  }, []);

  const from = watch("start", "");
  const endLocation = watch("end", "");

  useEffect(() => {
    // const filtered = busData.filter(
    //   (bus: any) =>
    //     (bus.from.name.toLowerCase().includes(from.toLowerCase()) ||
    //       bus.waypoints.some((waypoint: any) =>
    //         waypoint.toLowerCase().includes(from.toLowerCase())
    //       )) &&
    //     (bus.to.toLowerCase().includes(endLocation.toLowerCase()) ||
    //       bus.waypoints.some((waypoint: any) =>
    //         waypoint.toLowerCase().includes(endLocation.toLowerCase())
    //       ))
    // );
    // setFilteredBusData(filtered);
    setFilteredBusData(busData);
  }, [from, endLocation]);

  return (
    <div className="p-6 bg-gradient-to-r from-white to-gray-200 min-h-screen">

      <div className="mb-6">
        <form className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Start Location"
            {...register("start")}
            className="p-2 border bg-white text-gray-800 border-gray-300 rounded-lg flex-1"
          />
          <IoMdSwap className="text-gray-800 h-6 w-6" />
          <input
            type="text"
            placeholder="End Location"
            {...register("end")}
            className="p-2 border bg-white text-gray-800 border-gray-300 rounded-lg flex-1"
          />
        </form>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {filteredBusData.map((bus: any) => (
          <div
            key={bus.id}
            className="bg-white border border-gray-200 p-6 rounded-lg shadow-lg cursor-pointer"
            onClick={() => handleClick(bus.id)}
          >
            <div className="flex justify-center items-center space-x-3 mb-2">
              <FaBusAlt className="text-green-800 h-6 w-6" />
              <div className="text-lg font-semibold text-gray-700">
                <strong>{bus.from.name}</strong>
                <span className="text-gray-500"> → </span>
                <strong>{bus.to.name}</strong>
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded-lg">
              <div className="flex justify-between mb-1">
                <div className="text-gray-600">
                  Departure:{" "}
                  <span className="font-medium text-gray-800">12:00</span>
                </div>
                <div className="text-gray-600">
                  Arrival:{" "}
                  <span className="font-medium text-gray-800">3:00</span>
                </div>
              </div>
              <div className="flex justify-between">
                <div className="text-gray-600">
                  <span className="font-medium text-gray-800">
                    {bus.plateNumber}
                  </span>
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
