"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateStation() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState(""); // Add description state
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    if (!name) {
      setError("Station name is required");
      return;
    }

    try {
      const response = await fetch("http://localhost:4000/api/stations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }), // Send description in body
      });

      if (response.ok) {
        setSuccessMessage("Station created successfully!");
        setName("");
        setDescription(""); // Clear description field
        setTimeout(() => {
          router.push("/stations");
        }, 3000);
      } else {
        const errorResult = await response.json();
        setError(errorResult.error || "Failed to create station");
      }
    } catch (err) {
      console.error("Error creating station:", err);
      setError("Internal Server Error. Please try again later.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-6 py-6 px-8">
      <h1 className="text-3xl font-bold mb-6">Create New Station</h1>
      <p className="text-gray-500 mb-8">Enter the station details.</p>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 text-center mb-4">{successMessage}</p>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Station Name
          </label>
          <input
            type="text"
            placeholder="Enter station name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            placeholder="Enter station description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <button
          type="submit"
          className="px-7 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Create Station
        </button>
      </form>
    </div>
  );
}
