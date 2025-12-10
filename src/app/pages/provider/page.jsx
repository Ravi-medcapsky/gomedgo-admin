"use client";
import React, { useEffect, useState, useMemo } from "react";
import HeroSection from "@/app/component/HeroSection";
import { IoPersonSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Provider() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState([]);
  const [filtered, setFiltered] = useState([]);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [kyc, setKyc] = useState("");

  // Pagination
  const rowsPerPage = 10;
  const [page, setPage] = useState(1);

  // 1️⃣ FETCH DATA FROM API
  const getProviders = async () => {
    try {
      setLoading(true);

      const res = await fetch(
        "https://devapi.medcapsky.com/api/admin/total_provider"
      );
      const json = await res.json();

      const list = json?.data?.data || [];
      console.log("Fetched providers:", list);

      setProviders(list);
      setFiltered(list);
    } catch (error) {
      console.log("Provider fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProviders();
  }, []);

  // 2️⃣ FILTER LOGIC (Optimized)
  useEffect(() => {
    let data = [...providers];

    if (search.trim() !== "") {
      data = data.filter(
        (p) =>
          p.first_name?.toLowerCase().includes(search.toLowerCase()) ||
          p.last_name?.toLowerCase().includes(search.toLowerCase()) ||
          p.mobile_no?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "") {
      data = data.filter((p) => String(p.active_status) === String(status));
    }

    if (kyc !== "") {
      data = data.filter((p) => p.kyc_status === kyc);
    }

    setFiltered(data);
    setPage(1); // reset pagination
  }, [search, status, kyc, providers]);

  // 3️⃣ PAGINATION (Optimized)
  const totalPages = Math.ceil(filtered.length / rowsPerPage);
  const paginated = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    return filtered.slice(start, start + rowsPerPage);
  }, [page, filtered]);

  const kycStatusIcon = {
    verified: <span className="text-green-500 font-bold">Verified</span>,
    pending: <span className="text-yellow-500 font-bold">Pending</span>,
    Rejected: <span className="text-red-500 font-bold">Rejected</span>,
  };

  return (
    <div className="w-full">
      <HeroSection title="Providers" title2="Providers" />

      <div className="container mx-auto max-w-[96%] shadow-lg rounded-lg bg-white -mt-10 p-6">
        {/* 🔍 FILTER SECTION */}
        <div className="flex flex-wrap gap-6 mb-6">
          {/* Search */}
          <div>
            <label className="font-medium text-gray-700 mr-2">Search:</label>
            <input
              type="text"
              placeholder="Name or mobile..."
              className="border rounded px-3 py-2 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="font-medium text-gray-700 mr-2">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="border rounded px-3 py-2 text-sm">
              <option value="">All</option>
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>

          {/* KYC Filter */}
          <div>
            <label className="font-medium text-gray-700 mr-2">KYC:</label>
            <select
              value={kyc}
              onChange={(e) => setKyc(e.target.value)}
              className="border rounded px-3 py-2 text-sm">
              <option value="">All</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/*  TABLE */}
        <div className="overflow-x-auto">
          {loading ? (
            <div className="py-10 text-center text-gray-500">Loading…</div>
          ) : paginated.length === 0 ? (
            <div className="py-10 text-center text-gray-500">
              No providers found.
            </div>
          ) : (
            <>
              <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-100 text-gray-700 text-sm uppercase">
                  <tr>
                    <th className="py-3 px-4 text-left">Profile/KYC</th>
                    <th className="py-3 px-4 text-left">Name</th>
                    <th className="py-3 px-4 text-left">Mobile</th>
                    <th className="py-3 px-4 text-left">Email</th>
                    <th className="py-3 px-4 text-left">Status</th>
                    <th className="py-3 px-4 text-left">Created</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="text-sm">
                  {paginated.map((p, i) => (
                    <tr
                      key={p.id}
                      className={`${
                        i % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-blue-50`}>
                      <td className="py-3 px-4 flex gap-2 items-center">
                        {/* {p.id} */}
                        {/* <button
                          className="bg-green-500 p-2 rounded-full text-white hover:bg-green-600"
                          onClick={() => handleApproveKyc(p.id)}>
                          Approve KYC
                        </button> */}
                        {p.current_status === 5 ? (
                          <>
                            <Image
                              src="/apply.png"
                              alt="Completed profile"
                              width={20}
                              height={20}
                            />
                            {kycStatusIcon[p.kyc_status]}
                          </>
                        ) : (
                          <Image
                            src="/denied.png"
                            alt="Incomplete profile"
                            width={20}
                            height={20}
                          />
                        )}
                      </td>

                      <td className="py-3 px-4">
                        {p.first_name} {p.last_name}
                      </td>

                      <td className="py-3 px-4">{p.mobile_no}</td>

                      <td className="py-3 px-4">{p.email}</td>

                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            p.current_status == 1
                              ? "bg-green-100 text-green-700"
                              : p.current_status == 4
                              ? "bg-yellow-100 text-yellow-700"
                              : "bg-gray-200 text-gray-600"
                          }`}>
                          {p.current_status == 1
                            ? "Active"
                            : p.current_status == 4
                            ? "Pending"
                            : "Inactive"}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        {new Date(p.created_at).toLocaleDateString()}
                      </td>

                      <td className="py-3 px-4 text-center">
                        <button
                          className="bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600"
                          onClick={() =>
                            router.push(
                              `/component/ProvidersProfile?id=${p.id[0]}`
                            )
                          }>
                          <IoPersonSharp size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* 📌 PAGINATION */}

              <div className="flex justify-between items-center mt-4">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className={`px-4 py-2 rounded ${
                    page === 1
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-blue-500 text-white"
                  }`}>
                  Previous
                </button>

                <span className="text-sm text-gray-600">
                  Page {page} of {totalPages}
                </span>

                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className={`px-4 py-2 rounded ${
                    page === totalPages
                      ? "bg-gray-200 cursor-not-allowed"
                      : "bg-blue-500 text-white"
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
}
