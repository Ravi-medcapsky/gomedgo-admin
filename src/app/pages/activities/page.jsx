"use client";
import React, { useEffect, useState } from "react";
import HeroSection from "@/app/component/HeroSection";

const Activities = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  // ✅ Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // ✅ Dummy Data
  const membersData = [
    {
      id: 1,
      name: "Ram",
      mobileNO: "123-456-7890",
      status: "Success",
      time: "2025-10-09 09:45 AM",
      ipadress: "192.168.1.5",
      address: "Mumbai, Maharashtra, India",
      role: "User",
    },
    {
      id: 2,
      name: "Puja",
      mobileNO: "123-456-7890",
      status: "Failed",
      time: "2025-10-08 07:20 PM",
      ipadress: "192.168.1.8",
      address: "Delhi, India",
      role: "User",
    },
    {
      id: 3,
      name: "Raj Patel",
      mobileNO: "123-456-7890",
      status: "Success",
      time: "2025-10-07 03:10 PM",
      ipadress: "192.168.1.10",
      address: "Ahmedabad, Gujarat, India",
      role: "Provider",
    },
    {
      id: 4,
      name: "Sara Khan",
      mobileNO: "123-456-7890",
      status: "Failed",
      time: "2025-10-06 11:00 AM",
      ipadress: "192.168.1.12",
      address: "Bengaluru, Karnataka, India",
      role: "Manager",
    },
    {
      id: 5,
      name: "Ravi Sharma",
      mobileNO: "555-222-1111",
      status: "Success",
      time: "2025-10-05 05:30 PM",
      ipadress: "192.168.1.15",
      address: "Chennai, Tamil Nadu, India",
      role: "User",
    },
    {
      id: 6,
      name: "Meena Das",
      mobileNO: "888-777-6666",
      status: "Failed",
      time: "2025-10-04 02:20 PM",
      ipadress: "192.168.1.20",
      address: "Kolkata, West Bengal, India",
      role: "Admin",
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

  // ✅ Filter by search
  useEffect(() => {
    const filtered = members.filter(
      (m) =>
        m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.mobileNO.includes(searchQuery) ||
        m.ipadress.includes(searchQuery) ||
        m.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (m.role && m.role.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setFilteredMembers(filtered);
    setCurrentPage(1);
  }, [searchQuery, members]);

  // ✅ Pagination logic
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
      <HeroSection title="Activities" title2="Activities" />

      <div className="container mx-auto max-w-[96%] shadow-lg rounded-lg bg-white h-auto mr-auto ml-auto -mt-10 p-6">
        {/* ✅ Search */}
        <div className="flex flex-wrap gap-6 px-6 py-4">
          <label htmlFor="Search" className="flex items-center gap-2 text-gray-700">
            <span className="font-medium">Search:</span>
            <input
              type="text"
              id="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="name, mobile, IP, role, city"
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
        </div>

        {/* ✅ Table */}
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
                    <th className="py-3 px-5 text-left border-b border-gray-200">Login Date & time</th>
                    <th className="py-3 px-5 text-left border-b border-gray-200">Name</th>
                    <th className="py-3 px-5 text-left border-b border-gray-200">Mobile</th>
                    <th className="py-3 px-5 text-left border-b border-gray-200">IP Address</th>
                    <th className="py-3 px-5 text-left border-b border-gray-200">Login Status</th>
                    <th className="py-3 px-5 text-left border-b border-gray-200">City/State/Country</th>
                    <th className="py-3 px-5 text-center border-b border-gray-200">Role</th>
                  </tr>
                </thead>

                <tbody className="text-sm text-gray-700">
                  {paginatedData.map((member, i) => (
                    <tr key={member.id} className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition`}>
                      <td className="py-3 px-5 border-b border-gray-200">{member.time || "N/A"}</td>
                      <td className="py-3 px-5 border-b border-gray-200">{member.name}</td>
                      <td className="py-3 px-5 border-b border-gray-200">{member.mobileNO}</td>
                      <td className="py-3 px-5 border-b border-gray-200">{member.ipadress}</td>
                      <td className="py-3 px-5 border-b border-gray-200">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          member.status === "Success"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}>
                          {member.status}
                        </span>
                      </td>
                      <td className="py-3 px-5 border-b border-gray-200">{member.address}</td>
                      <td className="py-3 px-5 text-center border-b border-gray-200">{member.role || "N/A"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* ✅ Pagination */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={handlePrev}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 rounded-md ${currentPage === 1 ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
                  Previous
                </button>

                <span className="text-sm text-gray-600">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={handleNext}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 rounded-md ${currentPage === totalPages ? "bg-gray-200 text-gray-500 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                >
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

export default Activities;
