"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation"; // For navigation
import { useEffect, useState } from "react";

export default function Shifts() {
  const router = useRouter();
  const [shifts, setShifts] = useState([]); // State to hold fetched shifts
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { getToken } = useAuth();

  // Fetch shifts from backend
  useEffect(() => {
    const fetchShifts = async () => {
      const token = await getToken(); // Fetch the Clerk token

      try {
        const response = await fetch("http://localhost:4000/api/shifts", {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        }); // Replace with your API endpoint
        if (!response.ok) {
          throw new Error("Failed to fetch shifts");
        }
        const data = await response.json();
        setShifts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, []);

  const handleCreateNew = () => {
    router.push("/shifts/create"); // Navigate to Create New Shift page
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Shifts</h1>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Create New Shift
        </button>
      </div>

      {loading && <p>Loading shifts...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <table className="w-full border-separate border-spacing-y-4">
          <thead>
            <tr className="text-gray-500 text-sm font-medium">
              <th className="text-left px-4 py-2">Shift Name</th>
              <th className="text-left px-4 py-2">Start Time</th>
              <th className="text-left px-4 py-2">End Time</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift: any) => (
              <tr key={shift.id} className="bg-white shadow rounded-lg">
                <td className="px-4 py-3">{shift.name}</td>
                <td className="px-4 py-3">{shift.startTime}</td>
                <td className="px-4 py-3">{shift.endTime}</td>
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
