"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateShift() {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form from refreshing the page

    setError("");
    setSuccessMessage("");

    if (!name || !startTime || !endTime) {
      setError("All fields are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/shifts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          startTime,
          endTime,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage("Shift created successfully!");
        setName("");
        setStartTime("");
        setEndTime("");
        console.log("Created Shift:", result);
        setTimeout(() => {
          router.push("/stations");
        }, 3000);
      } else {
        const errorResult = await response.json();
        setError(errorResult.error || "Failed to create shift");
      }
    } catch (err) {
      console.error("Error creating shift:", err);
      setError("Internal Server Error. Please try again later.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 py-6 px-8">
      <h1 className="text-3xl font-bold mb-6">Create New Shift</h1>
      <p className="text-gray-500 mb-8">Enter the details for the new shift.</p>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 text-center mb-4">{successMessage}</p>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit}>
        {/* Shift Name */}
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Shift Name
          </label>
          <input
            type="text"
            placeholder="Enter shift name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-6 w-full mb-6">
          {/* Start Time */}
          <div className="w-full">
            <label className="block text-gray-700 font-medium mb-2">
              Start Time
            </label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* End Time */}
          <div className="w-full">
            <label className="block text-gray-700 font-medium mb-2">
              End Time
            </label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-7 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Create Shift
        </button>
      </form>
    </div>
  );
}
