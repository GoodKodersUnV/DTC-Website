'use client'

import axios from "axios";
import React, { useState } from "react";
import {  toast } from "react-hot-toast";

const Page = () => {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name : "",
    latitude: "",
    longitude: "",
  });

  const handleAddLocation = async () => {
    const { latitude, longitude , name } = form;
    if (!latitude.trim() || !longitude.trim() || !name.trim()) {
      toast.error("Please enter both latitude and longitude");
      return;
    }

    console.log(form);
    setLoading(true);
    try {
      const res = await axios.post("/api/locations/add", form);

      console.log(res.data);
      toast.success("Location added successfully!");
    } catch (error) {
      toast.error("Failed to add location");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-gray-500 p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Add Location</h1>
        <div className="mb-4">
          <label className="block text-gray-900 font-medium mb-2">
            Name
          </label>
          <input
            type="string"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 border border-gray-50 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter latitude"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-900 font-medium mb-2">
            Latitude
          </label>
          <input
            type="string"
            value={form.latitude}
            onChange={(e) => setForm({ ...form, latitude: e.target.value })}
            className="w-full p-2 border border-gray-50 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter latitude"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-900 font-medium mb-2">
            Longitude
          </label>
          <input
            type="string  "
            value={form.longitude}
            onChange={(e) => setForm({ ...form, longitude: e.target.value })}
            className="w-full p-2 border border-gray-50 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter longitude"
          />
        </div>
        <button
          onClick={handleAddLocation}
          className={`w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg 
          hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 
          focus:ring-opacity-75 ${
            loading ? "cursor-not-allowed opacity-50" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Location"}
        </button>
      </div>
    </div>
  );
};

export default Page;
