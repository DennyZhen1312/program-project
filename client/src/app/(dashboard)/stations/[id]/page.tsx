"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { StationType } from "@/types/types";

export default function UpdateStation() {
  const [station, setStation] = useState<StationType>({
    name: "",
    description: "",
  } as StationType);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const router = useRouter();
  const { id } = useParams();

  const fetchStation = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/stations/${id}`);
      if (!response.ok) throw new Error("Failed to fetch station details");

      const data = await response.json();
      setStation(data);
    } catch (err) {
      console.error("Error fetching station:", err);
      setError("Failed to load station data");
    }
  };

  useEffect(() => {
    if (id) fetchStation();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStation((prevStation) => ({
      ...prevStation,
      [name]: value,
    }));
  };

  const handleUpdateStation = async (e: React.FormEvent) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    if (!station.name) {
      setError("Station name is required");
      return;
    }

    try {
      const response = await fetch(`http://localhost:4000/api/stations/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(station),
      });

      if (response.ok) {
        setSuccessMessage("Station updated successfully!");
        setTimeout(() => {
          router.push("/stations");
        }, 2000);
      } else {
        throw new Error("Failed to update station");
      }
    } catch (err) {
      console.error("Error updating station:", err);
      setError("Internal Server Error. Please try again later.");
    }
  };

  const handleDeleteStation = async () => {
    try {
      const response = await fetch(`http://localhost:4000/api/stations/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setSuccessMessage("Station deleted successfully!");
        setTimeout(() => {
          router.push("/stations");
        }, 2000);
      } else {
        throw new Error("Failed to delete station");
      }
    } catch (err) {
      console.error("Error deleting station:", err);
      setError("Failed to delete station. Please try again.");
    }
  };

  return (
    <div className="mx-auto mt-6 py-6 px-8">
      <h1 className="text-3xl font-bold mb-6">Update Station</h1>
      <p className="text-gray-500 mb-8">Enter the station details.</p>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 text-center mb-4">{successMessage}</p>
      )}

      <form onSubmit={handleUpdateStation}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Station Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter station name"
            value={station.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter station description"
            value={station.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="px-7 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            Update Station
          </button>
          <button
            type="button"
            className="px-7 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
            onClick={handleDeleteStation}
          >
            Delete Station
          </button>
        </div>
      </form>
    </div>
  );
}
