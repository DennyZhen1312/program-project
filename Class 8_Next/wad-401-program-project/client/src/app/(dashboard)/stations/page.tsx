"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Stations() {
  const router = useRouter();
  const [stations, setStations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch stations from backend
  useEffect(() => {
    const fetchStations = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/stations");
        if (!response.ok) {
          throw new Error("Failed to fetch stations");
        }
        const data = await response.json();
        setStations(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStations();
  }, []);

  const handleCreateNew = () => {
    router.push("/stations/create");
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Stations</h1>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Create New Station
        </button>
      </div>

      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <table className="w-full border-separate border-spacing-y-4">
          <thead>
            <tr className="text-gray-500 text-sm font-medium">
              <th className="text-left px-4 py-2">Station Name</th>
              <th className="text-left px-4 py-2">Description</th>
              <th className="text-left px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {stations.map((station: any) => (
              <tr key={station.id} className="bg-white shadow rounded-lg">
                <td className="px-4 py-3 font-bold">{station.name}</td>
                <td className="px-4 py-3">{station.description}</td>
                <td className="px-4 py-3 flex gap-4">
                  <button className="text-blue-500 hover:text-blue-700 font-medium">
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-red-700 font-medium">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
