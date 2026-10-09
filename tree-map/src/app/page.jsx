"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import useTrees from "../hooks/useTrees";
import TreeForm from "../components/TreeForm";

const Map = dynamic(
  () => import("../components/Map"),
  {
    ssr: false,
  }
);

export default function Home() {
  const { trees, addTree, loading } = useTrees();
  const [location, setLocation] = useState(null);
  const [formData, setFormData] = useState({
    userName: "",
    treeName: "",
  });

  const handleMapClick = (location) => {
    setLocation(location);
  };

  const handleSaveTree = async () => {
    // 1. Guard check to avoid null reference error
    if (!location) {
      alert("Please select a location on the map first.");
      return;
    }

    const newTree = {
      userName: formData.userName,
      treeName: formData.treeName,
      lat: location.lat,
      lng: location.lng,
      date: new Date().toLocaleDateString(),
    };

    // Save tree to Firebase
    await addTree(newTree);

    // Clear form and reset location
    setFormData({
      userName: "",
      treeName: "",
    });
    setLocation(null);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-2 text-3xl font-bold text-green-700">
          🌳 Real-Time Tree Planting Map
        </h1>

        <p className="mb-6 text-gray-600">
          Click on the map, select a location, and plant your tree in real-time.
        </p>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Map */}
          <div className="lg:col-span-2">
            <Map trees={trees} onMapClick={handleMapClick} />
          </div>

          {/* Form & Total Count */}
          <div>
            <TreeForm
              location={location}
              formData={formData}
              setFormData={setFormData}
              onSave={handleSaveTree}
            />

            <div className="mt-4 rounded-lg bg-white p-4 shadow-sm">
              <h2 className="font-semibold">Total Trees Planted</h2>
              <p className="mt-1 text-3xl font-bold text-green-600">
                {loading ? "Loading..." : trees.length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}