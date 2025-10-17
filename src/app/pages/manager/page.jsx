"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "@/app/component/HeroSection";
import { FaPersonCirclePlus } from "react-icons/fa6";
import { IoPersonSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";

const Manager = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const router = useRouter();
  const rowsPerPage = 5;

  // ✅ Dummy data (replace with API later)
  const membersData = [
    {
      id: 1,
      name: "John Doe",
      email: "john@gmail.com",
      mobile: 9999999999,
      role: "Admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@gmail.com",
      mobile: 9999999999,
      role: "Manager",
      status: "Inactive",
    },
    {
      id: 3,
      name: "Raj Patel",
      email: "raj@gmail.com",
      mobile: 9999999999,
      role: "Support",
      status: "Active",
    },
    {
      id: 4,
      name: "Anita Verma",
      email: "anita@gmail.com",
      mobile: 9999999999,
      role: "Support",
      status: "Inactive",
    },
    {
      id: 5,
      name: "Vikas Kumar",
      email: "vikas@gmail.com",
      mobile: 9999999999,
      role: "Manager",
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
    setCurrentPage(1);
  }, [searchQuery, statusFilter, members]);

  // ✅ Pagination
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

  // ✅ Toggle Active/Inactive
  const handleToggleStatus = (id) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id
          ? {
              ...member,
              status: member.status === "Active" ? "Inactive" : "Active",
            }
          : member
      )
    );
  };

  return (
    <div className="w-full">
      <HeroSection title="Team Management" title2="Team Management" />

      <div className="container mx-auto max-w-[96%] shadow-lg rounded-lg bg-white h-auto mr-auto ml-auto -mt-10 p-6">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          {/* Search and Filter */}
          <div className="flex flex-wrap gap-6">
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
                placeholder="Search by name or email"
                className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </label>

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

          {/* Add Button */}
          <button
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
            onClick={() => router.push("/component/createAdmin")}>
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
                      Email
                    </th>
                    <th className="py-3 px-5 text-left border-b border-gray-200">
                      Phone Number
                    </th>
                    <th className="py-3 px-5 text-left border-b border-gray-200">
                      Role
                    </th>
                    <th className="py-3 px-5 text-left border-b border-gray-200">
                      Status
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
                      <td className="py-3 px-5 border-b border-gray-200 font-medium">
                        {member.name}
                      </td>
                      <td className="py-3 px-5 border-b border-gray-200">
                        {member.email}
                      </td>
                      <td className="py-3 px-5 border-b border-gray-200">
                        {member.mobile}
                      </td>
                      <td className="py-3 px-5 border-b border-gray-200">
                        {member.role}
                      </td>
                      <td className="py-3 px-5 border-b border-gray-200">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            member.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-center border-b border-gray-200">
                        <button
                          onClick={() => handleToggleStatus(member.id)}
                          className={`px-4 py-1 rounded-lg text-white ${
                            member.status === "Active"
                              ? "bg-red-600 hover:bg-red-700"
                              : "bg-green-600 hover:bg-green-700"
                          }`}>
                          {member.status === "Active"
                            ? "Deactivate"
                            : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Pagination Controls */}
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

                <span className="text-sm text-gray-700">
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

export default Manager;
