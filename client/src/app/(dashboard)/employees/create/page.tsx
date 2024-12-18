"use client";

import { useAuth } from "@clerk/nextjs";
import React, { useState } from "react";

export default function CreateEmployee() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  const { getToken } = useAuth();

  const handleAddEmployee = () => {
    if (!name) {
      setError("Employee name is required.");
      return;
    }
    setError("");
    setShowModal(true);
  };

  const handleCreateEmployeeAndSendInvitation = async () => {
    const token = await getToken(); // Fetch the Clerk token

    setError("");
    setSuccessMessage("");

    try {
      // Step 1: Create Employee
      const employeeResponse = await fetch("http://localhost:4000/api/employees", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (!employeeResponse.ok) {
        const result = await employeeResponse.json();
        setError(result.error || "Failed to create employee.");
        return;
      }

      // Step 2: Send Invitation
      const sendInvitationResponse = await fetch("http://localhost:4000/api/invitations", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          emailAddress: email,
          redirectUrl: "http://localhost:3000/employee-signup",
        }),
      });

      if (sendInvitationResponse.ok) {
        setSuccessMessage("Employee created and invitation sent successfully!");
        setShowModal(false);
        setName("");
        setEmail("");
      } else {
        const result = await sendInvitationResponse.json();
        setError(result.message || "Failed to send invitation.");
      }
    } catch (err) {
      console.error("Error processing request:", err);
      setError("Internal Server Error. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6">Add New Employee</h1>
      <p className="text-gray-500 text-center mb-8">
        Enter the name and email of the new employee.
      </p>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {successMessage && (
        <p className="text-green-500 text-center mb-4">{successMessage}</p>
      )}

      {/* Employee Name Input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Employee Name
        </label>
        <input
          type="text"
          placeholder="Enter employee name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Employee Email Input */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          placeholder="Enter email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={handleAddEmployee}
        className="w-full px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Add Employee
      </button>

      {/* Modal for Confirming Actions */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-2xl font-bold mb-4">Confirm Actions</h2>
            <p className="text-gray-500 mb-4">
              Do you want to create the employee and send the invitation?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateEmployeeAndSendInvitation}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
