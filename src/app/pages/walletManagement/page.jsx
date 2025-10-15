"use client";
import HeroSection from "@/app/component/HeroSection";
import React, { useState, useEffect } from "react";

const WalletManagement = () => {
  const [step, setStep] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const [members] = useState([
    { id: 1, name: "Rahul", bank: "HDFC Bank", account: "XXXX1234", ifsc: "HDFC0001234", payment: "0" },
    { id: 2, name: "Amit", upi: "a@axis", payment: "0" },
    { id: 3, name: "Puja", bank: "ICICI Bank", account: "XXXX8765", ifsc: "ICIC0004321", payment: "0" },
    { id: 4, name: "Ram", upi: "b@axis", payment: "0" },
    { id: 5, name: "Sneha", bank: "SBI Bank", account: "XXXX9999", ifsc: "SBIN0000456", payment: "0" },
    { id: 6, name: "Karan", upi: "k@hdfc", payment: "0" },
  ]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredMembers, setFilteredMembers] = useState([]);

  // ✅ Filter and paginate
  useEffect(() => {
    let filtered = [];

    if (step === 1) {
      filtered = members.filter((m) => m.bank);
      if (searchQuery.trim()) {
        filtered = filtered.filter(
          (m) =>
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.bank.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    } else {
      filtered = members.filter((m) => m.upi);
      if (searchQuery.trim()) {
        filtered = filtered.filter(
          (m) =>
            m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            m.upi.toLowerCase().includes(searchQuery.toLowerCase())
        );
      }
    }

    setFilteredMembers(filtered);
    setCurrentPage(1); // reset to first page on filter or tab change
  }, [searchQuery, step, members]);

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredMembers.length / rowsPerPage);
  const paginatedMembers = filteredMembers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleNext = () => currentPage < totalPages && setCurrentPage((p) => p + 1);
  const handlePrev = () => currentPage > 1 && setCurrentPage((p) => p - 1);

  return (
    <div>
      <HeroSection title="Wallet Management" title2="Wallet" />

      <div className="container mx-auto max-w-[96%] shadow-lg rounded-lg bg-white h-auto mr-auto ml-auto -mt-10">
        {/* Tabs */}
        <div className="text-gray-600">
          <div className="flex space-x-6 pt-4 px-5 items-center">
            <button
              onClick={() => setStep(1)}
              className={`pb-4 transition-all ${
                step === 1
                  ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                  : "hover:text-blue-500"
              }`}>
              Bank Accounts
            </button>

            <button
              onClick={() => setStep(2)}
              className={`pb-4 transition-all ${
                step === 2
                  ? "border-b-2 border-blue-500 text-blue-500 font-semibold"
                  : "hover:text-blue-500"
              }`}>
              UPI Accounts
            </button>

            <div className="ml-auto text-gray-500 font-medium">
              Total Records: {filteredMembers.length}
            </div>
          </div>
          <div className="border-b-2 border-gray-200 mt-1" />
        </div>

        {/* Search */}
        <div className="flex flex-wrap gap-6 px-6 py-4">
          <label className="flex items-center gap-2 text-gray-700">
            <span className="font-medium">Search:</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={step === 1 ? "Search by name or bank" : "Search by name or UPI"}
              className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </label>
        </div>

        {/* Tables */}
        <div className="p-6">
          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Linked Bank Accounts
              </h2>
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left border-b">Provider ID</th>
                    <th className="px-4 py-2 text-left border-b">Name</th>
                    <th className="px-4 py-2 text-left border-b">Bank</th>
                    <th className="px-4 py-2 text-left border-b">Account</th>
                    <th className="px-4 py-2 text-left border-b">IFSC</th>
                    <th className="px-4 py-2 text-left border-b">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMembers.length > 0 ? (
                    paginatedMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b">{m.id}</td>
                        <td className="px-4 py-2 border-b">{m.name}</td>
                        <td className="px-4 py-2 border-b">{m.bank}</td>
                        <td className="px-4 py-2 border-b">{m.account}</td>
                        <td className="px-4 py-2 border-b">{m.ifsc}</td>
                        <td className="px-4 py-2 border-b font-medium">{m.payment}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center py-4 text-gray-500">
                        No matching records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                Linked UPI Accounts
              </h2>
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden text-sm">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-4 py-2 text-left border-b">Provider ID</th>
                    <th className="px-4 py-2 text-left border-b">Name</th>
                    <th className="px-4 py-2 text-left border-b">UPI</th>
                    <th className="px-4 py-2 text-left border-b">Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedMembers.length > 0 ? (
                    paginatedMembers.map((m) => (
                      <tr key={m.id} className="hover:bg-gray-50">
                        <td className="px-4 py-2 border-b">{m.id}</td>
                        <td className="px-4 py-2 border-b">{m.name}</td>
                        <td className="px-4 py-2 border-b">{m.upi}</td>
                        <td className="px-4 py-2 border-b font-medium">{m.payment}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-4 text-gray-500">
                        No matching records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          )}

          {/* ✅ Pagination Controls */}
          {filteredMembers.length > 0 && (
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
          )}
        </div>
      </div>
    </div>
  );
};

export default WalletManagement;
