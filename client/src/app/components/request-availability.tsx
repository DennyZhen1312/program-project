"use client";
import React from "react";

const RequestAvailability = () => {
  const handleRequestAvailability = async () => {
    try {
      const response = await fetch(
        "http://localhost:4000/api/availability/requestAvailabilities",
        {
          method: "POST",
        }
      );

      if (response.ok) {
        console.log("Availabilities Requested");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => handleRequestAvailability()}
        className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
      >
        Request Availability
      </button>
    </div>
  );
};

export default RequestAvailability;
