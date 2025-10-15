"use client";
import React, { useState } from "react";
import HeroSection from "../HeroSection";
import Image from "next/image";
import logoimg from "../../../../public/logo.png";

const UsersProfile = () => {
  const [step, setStep] = useState(1);
  const [subStep, setSubStep] = useState(1);
  const [orderPage, setOrderPage] = useState(1);
  const [txnPage, setTxnPage] = useState(1);

  // Dummy Orders Data
  const orders = Array.from({ length: 14 }, (_, i) => ({
    id: i + 1,
    orderId: `ORD-${2000 + i}`,
    date: "2025-10-15",
    amount: `${(i + 1) * 180}`,
    status: i % 3 === 0 ? "Completed" : i % 3 === 1 ? "Pending" : "Cancelled",
    desc: i % 2 === 0 ? "some thing" : "time issue",
  }));

  // Dummy Transactions Data
  const transactions = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    txnId: `TXN-${8000 + i}`,
    type: i % 2 === 0 ? "Credit" : "Debit",
    amount: `${(i + 1) * 250}`,
    date: "2025-10-14",
    remarks: i % 2 === 0 ? "Wallet Top-Up" : "Service Payment",
  }));

  const ordersPerPage = 5;
  const txnsPerPage = 5;

  const startOrderIndex = (orderPage - 1) * ordersPerPage;
  const visibleOrders = orders.slice(
    startOrderIndex,
    startOrderIndex + ordersPerPage
  );

  const startTxnIndex = (txnPage - 1) * txnsPerPage;
  const visibleTxns = transactions.slice(
    startTxnIndex,
    startTxnIndex + txnsPerPage
  );

  const totalOrderPages = Math.ceil(orders.length / ordersPerPage);
  const totalTxnPages = Math.ceil(transactions.length / txnsPerPage);

  return (
    <div className="w-full mb-4">
      <HeroSection title="User Profile" title2="User account" />

      <div className="max-w-[96%] mx-auto -mt-6">
        {/* Top Tabs */}
        <div className="bg-white shadow-lg rounded-lg px-6 py-4">
          <div className="flex space-x-6 border-b border-gray-200">
            {["Profile", "History Of Orders", "Transaction"].map(
              (tab, index) => (
                <button
                  key={tab}
                  onClick={() => setStep(index + 1)}
                  className={`pb-2 text-sm transition-all ${
                    step === index + 1
                      ? "border-b-2 border-blue-400 text-blue-500 font-semibold"
                      : "text-gray-600 hover:text-blue-400"
                  }`}>
                  {tab}
                </button>
              )
            )}
          </div>
        </div>

        {/* PROFILE SECTION */}
        {step === 1 && (
          <div className="flex flex-col md:flex-row gap-6 mt-6">
            {/* Left Card */}
            <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg">
              <div className="text-center py-4">
                <Image
                  src={logoimg}
                  alt="User"
                  width={120}
                  height={120}
                  className="mx-auto rounded-full border"
                />
                <h3 className="text-md font-semibold text-gray-700 mt-2">
                  User Name
                </h3>
              </div>

              <div className="space-y-3 ml-4 mt-4 text-sm mb-4">
                <div>
                  <p className="font-semibold text-gray-600">Email</p>
                  <p className="text-gray-400">user@gmail.com</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Phone</p>
                  <p className="text-gray-400">9876543210</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Date of Joining</p>
                  <p className="text-gray-400">15/10/2023</p>
                </div>
                <div>
                  <p className="font-semibold text-gray-600">Total Orders</p>
                  <p className="text-gray-400">25</p>
                </div>
              </div>
            </div>

            {/* Right Card */}
            <div className="w-full md:w-2/3 bg-white shadow-lg rounded-lg p-6">
              <div className="flex space-x-6 border-b border-gray-200">
                {["General Info", "Documents"].map((tab, index) => (
                  <button
                    key={tab}
                    onClick={() => setSubStep(index + 1)}
                    className={`pb-2 text-sm transition-all ${
                      subStep === index + 1
                        ? "border-b-2 border-blue-400 text-blue-500 font-semibold"
                        : "text-gray-600 hover:text-blue-400"
                    }`}>
                    {tab}
                  </button>
                ))}
              </div>

              {/* General Info */}
              {subStep === 1 && (
                <div className="mt-4 text-sm space-y-4">
                  {[
                    ["User ID", "U123456"],
                    ["Full Name", "John Doe"],
                    ["City", "Lucknow"],
                  ].map(([label, value]) => (
                    <div key={label} className="flex justify-between">
                      <h5 className="font-semibold">{label}</h5>
                      <p className="text-gray-700">{value}</p>
                    </div>
                  ))}
                  <div className="flex justify-between items-center">
                    <h5 className="font-semibold">Status</h5>
                    <select className="border rounded px-2 py-1 text-sm">
                      <option>Active</option>
                      <option>Inactive</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Documents */}
              {subStep === 2 && (
                <div className="mt-4 grid grid-cols-2 gap-4">
                  {["Report ", "discreption"].map((doc) => (
                    <div
                      key={doc}
                      className="border rounded-lg p-3 flex flex-col justify-between">
                      <p className="font-semibold text-gray-700 mb-2">{doc}</p>
                      <div className="flex gap-2">
                        <button className="text-blue-500 text-sm underline">
                          View
                        </button>
                        <button className="text-green-500 text-sm underline">
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ORDER HISTORY SECTION */}
        {step === 2 && (
          <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Order History
            </h2>
            {visibleOrders.length > 0 ? (
              <>
                <table className="w-full text-sm mt-4 border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">Order ID</th>
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-left">Amount</th>
                      <th className="p-2 text-left">Status</th>
                      <th className="p-2 text-left">Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleOrders.map((o) => (
                      <tr key={o.id} className="border-t">
                        <td className="p-2">{o.orderId}</td>
                        <td className="p-2">{o.date}</td>
                        <td className="p-2">₹{o.amount}</td>
                        <td
                          className={`p-2 font-medium ${
                            o.status === "Completed"
                              ? "text-green-600"
                              : o.status === "Cancelled"
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}>
                          {o.status}
                        </td>
                        <td className="p-2">{o.desc}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    disabled={orderPage === 1}
                    onClick={() => setOrderPage(orderPage - 1)}
                    className={`px-3 py-1 rounded ${
                      orderPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}>
                    Previous
                  </button>
                  <p className="text-gray-600 text-sm">
                    Page {orderPage} of {totalOrderPages}
                  </p>
                  <button
                    disabled={startOrderIndex + ordersPerPage >= orders.length}
                    onClick={() => setOrderPage(orderPage + 1)}
                    className={`px-3 py-1 rounded ${
                      startOrderIndex + ordersPerPage >= orders.length
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}>
                    Next
                  </button>
                </div>
              </>
            ) : (
              <p>No orders found.</p>
            )}
          </div>
        )}

        {/* TRANSACTION HISTORY SECTION */}
        {step === 3 && (
          <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              Transaction History
            </h2>
            {visibleTxns.length > 0 ? (
              <>
                <table className="w-full text-sm mt-4 border">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="p-2 text-left">Txn ID</th>
                      <th className="p-2 text-left">Type</th>
                      <th className="p-2 text-left">Amount</th>
                      <th className="p-2 text-left">Date</th>
                      <th className="p-2 text-left">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleTxns.map((t) => (
                      <tr
                        key={t.id}
                        className={`border-t ${
                          t.type === "Credit" ? "bg-green-50" : "bg-red-50"
                        }`}>
                        <td className="p-2">{t.txnId}</td>
                        <td
                          className={`p-2 font-semibold ${
                            t.type === "Credit"
                              ? "text-green-600"
                              : "text-red-600"
                          }`}>
                          {t.type}
                        </td>
                        <td className="p-2">₹{t.amount}</td>
                        <td className="p-2">{t.date}</td>
                        <td className="p-2">{t.remarks}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    disabled={txnPage === 1}
                    onClick={() => setTxnPage(txnPage - 1)}
                    className={`px-3 py-1 rounded ${
                      txnPage === 1
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}>
                    Previous
                  </button>
                  <p className="text-gray-600 text-sm">
                    Page {txnPage} of {totalTxnPages}
                  </p>
                  <button
                    disabled={
                      startTxnIndex + txnsPerPage >= transactions.length
                    }
                    onClick={() => setTxnPage(txnPage + 1)}
                    className={`px-3 py-1 rounded ${
                      startTxnIndex + txnsPerPage >= transactions.length
                        ? "bg-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}>
                    Next
                  </button>
                </div>
              </>
            ) : (
              <p>No transactions found.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UsersProfile;
