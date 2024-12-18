"use client";

import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Employees() {
  const router = useRouter();
  const [employees, setEmployees] = useState([]); // State to hold fetched employees
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { getToken } = useAuth();

  // Fetch employees from backend
  useEffect(() => {
    const fetchEmployees = async () => {
      const token = await getToken(); // Fetch the Clerk token

      try {
        const response = await fetch("http://localhost:4000/api/employees", {
          headers: {
            Authorization: `Bearer ${token}`, // Add Authorization header
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch employees");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleCreateNew = () => {
    router.push("/employees/create"); // Navigate to Create New Employee page
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-bold">Employees</h1>
        <button
          onClick={handleCreateNew}
          className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
        >
          Add New Employee
        </button>
      </div>

      {loading && <p>Loading employees...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <table className="w-full border-separate border-spacing-y-4">
          <thead>
            <tr className="text-gray-500 text-sm font-medium">
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Email</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee: any) => (
              <tr key={employee.id} className="bg-white shadow rounded-lg">
                <td className="px-4 py-3">{employee.name}</td>
                <td className="px-4 py-3">{employee.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
