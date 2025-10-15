"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "@/app/component/HeroSection";
import { IoPersonSharp } from "react-icons/io5";

const Users = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // ✅ Dummy data (replace with API later)
  const membersData = [
    {
      id: 1,
      name: "John Doe",
      mobileNO: "123-456-7890",
      zipcode: "560001",
      email: "john@gmail.com",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      mobileNO: "123-456-7890",
      zipcode: "560001",
      email: "jane@gmail.com",
      status: "Active",
    },
    {
      id: 3,
      name: "Raj Patel",
      mobileNO: "123-456-7890",
      zipcode: "560001",
      email: "raj@gmail.com",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Patel",
      mobileNO: "123-456-7890",
      zipcode: "560001",
      email: "ra@gmail.com",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Sara Khan",
      mobileNO: "123-456-7890",
      zipcode: "560001",
      email: "sara@gmail.com",
      status: "Active",
    },
    {
      id: 6,
      name: "Ravi Sharma",
      mobileNO: "555-222-1111",
      zipcode: "560001",
      email: "ravi@gmail.com",
      status: "Inactive",
    },
    {
      id: 7,
      name: "Meena Das",
      mobileNO: "888-777-6666",
      zipcode: "560001",
      email: "meena@gmail.com",
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

    // Search by name/mobileNO
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter(
        (m) =>
          m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          m.mobileNO.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== "") {
      filtered = filtered.filter(
        (m) => m.status.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    setFilteredMembers(filtered);
    setCurrentPage(1); // reset to first page when filters change
  }, [searchQuery, statusFilter, members]);

  // ✅ Pagination Logic
  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const paginatedData = filteredMembers.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };
  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <HeroSection title="Users" title2="Users" />

      {/* Main Content */}
      <div className="container mx-auto max-w-[96%] shadow-lg rounded-lg bg-white h-auto mr-auto ml-auto -mt-10 p-6">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="flex flex-wrap gap-6">
            {/* Search */}
            <label
              htmlFor="Search"
              className="flex items-center gap-2 text-gray-700">
              <span className="font-medium">Search:</span>
              <input
                type="text"
                id="Search"
                name="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name or mobile"
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

            {/* Status Filter */}
            <label
              htmlFor="Status"
              className="flex items-center gap-2 text-gray-700">
              <span className="font-medium">Status:</span>
              <select
                id="Status"
                name="Status"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400">
                <option value="">All</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="text-center py-10 text-gray-500">
              Loading providers...
            </div>
          ) : paginatedData.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No providers found.
            </div>
          ) : (
            <>
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
                      Mobile Number
                    </th>
                    <th className="py-3 px-5 text-left border-b border-gray-200">
                      Zip Code
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
                  {paginatedData.map((member, i) => (
                    <tr
                      key={i}
                      className={`${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50 transition`}>
                      <td className="py-3 px-5 border-b border-gray-200">
                        {member.id}
                      </td>
                      <td className="py-3 px-5 border-b border-gray-200">
                        {member.name}
                      </td>
                      <td className="py-3 px-5 border-b border-gray-200">
                        {member.mobileNO}
                      </td>
                      <td className="py-3 px-5 border-b border-gray-200">
                        {member.zipcode}
                      </td>
                      <td className="py-3 px-5 border-b border-gray-200">
                        {member.email}
                      </td>
                      <td className="py-3 px-5 border-b border-gray-200">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            member.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="py-3 px-5 border-b border-gray-200">
                        {member.createdAt || "N/A"}
                      </td>
                      <td className="py-3 px-5 text-center border-b border-gray-200">
                        <button
                          className="bg-blue-500 p-2 rounded-full text-white mr-3 hover:bg-blue-600"
                          onClick={() => alert("Not implemented yet!")}>
                          <IoPersonSharp size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* ✅ Pagination Controls */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === 1
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}>
                  Previous
                </button>

                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}>
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
