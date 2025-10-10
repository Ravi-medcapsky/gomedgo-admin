"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "@/app/componenet/HeroSection";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";

const Manager = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Dummy data (replace with API later)
  const membersData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@gmail.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@gmail.com",
      status: "Pending",
    },
    {
      id: 3,
      name: "Raj Patel",
      email: "raj@gmail.com",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Patel",
      email: "ra@gmail.com",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Sara Khan",
      email: "sara@gmail.com",
      status: "Active",
    },
  ];

  // ✅ Simulate API fetch
  useEffect(() => {
    setTimeout(() => {
      setMembers(membersData);
      setFilteredMembers(membersData);
      setLoading(false);
    }, 500);
  }, []);

  // ✅ Apply search + status filters
  useEffect(() => {
    let filtered = members;

    // Search by name/email
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "") {
      filtered = filtered.filter(
        (m) => m.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredMembers(filtered);
  }, [searchQuery, statusFilter, members]);

  return (
    <div className="w-full">
      {/* Header Section */}
      <HeroSection title="Team Management" title2="Team Management" />

      {/* Main Content */}
      <div className="container mx-auto max-w-[96%] shadow-lg rounded-lg bg-white h-auto mr-auto ml-auto -mt-10 p-6">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          {/* Search and Filter */}
          <div className="flex flex-wrap gap-6">
            <label
              htmlFor="Search"
              className="flex items-center gap-2 text-gray-700"
            >
              <span className="font-medium">Search:</span>
              <input
                type="text"
                id="Search"
                name="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or email"
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            <label
              htmlFor="Status"
              className="flex items-center gap-2 text-gray-700"
            >
              <span className="font-medium">Status:</span>
              <select
                id="Status"
                name="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Pending">Pending</option>
              </select>
            </label>
          </div>

          {/* Add Button */}
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200">
            <FaPersonCirclePlus className="text-lg" />
            Add Member
          </button>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-10 text-gray-500">
              Loading team members...
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No members found.
            </div>
          ) : (
            <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                <tr>
                  <th className="py-3 px-5 text-left border-b border-gray-200">
                    ID
                  </th>
                  <th className="py-3 px-5 text-left border-b border-gray-200">
                    Name
                  </th>
                  <th className="py-3 px-5 text-left border-b border-gray-200">
                    Email
                  </th>
                  <th className="py-3 px-5 text-left border-b border-gray-200">
                    Status
                  </th>
                  <th className="py-3 px-5 text-left border-b border-gray-200">
                    Created At
                  </th>
                  <th className="py-3 px-5 text-center border-b border-gray-200">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {filteredMembers.map((member, i) => (
                  <tr
                    key={i}
                    className={`${
                      i % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } hover:bg-blue-50 transition`}
                  >
                    <td className="py-3 px-5 border-b border-gray-200">
                      {member.id}
                    </td>
                    <td className="py-3 px-5 border-b border-gray-200">
                      {member.name}
                    </td>
                    <td className="py-3 px-5 border-b border-gray-200">
                      {member.email}
                    </td>

                    <td className="py-3 px-5 border-b border-gray-200">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          member.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : member.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {member.status}
                      </span>
                    </td>
                    <td className="py-3 px-5 border-b border-gray-200">
                      {member.createdAt || "N/A"}
                    </td>
                    <td className="py-3 px-5 text-center border-b border-gray-200">
                      <button
                        className="bg-blue-500 p-2 rounded-full text-white  mr-3"
                        onClick={() => alert("Not implemented yet!")}
                      >
                        <IoPersonSharp size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manager;
