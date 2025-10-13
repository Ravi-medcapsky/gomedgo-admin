"use client";
import { StatusCards } from "@/app/componenet/StatusCards";
import React, { useState } from "react";
import { FaWallet, FaChartLine, FaMoneyBillWave } from "react-icons/fa";
import { FaBell } from "react-icons/fa6";

const Dashboard = () => {
  const [step, setStep] = useState(1);

  const stats = [
    {
      label: "Wallet",
      amount: 0,
      icon: <FaWallet className="text-green-400 mx-auto text-xl" />,
    },
    {
      label: "Trading",
      amount: 0,
      icon: <FaChartLine className="text-blue-400 mx-auto text-xl" />,
    },
    {
      label: "Funds",
      amount: 0,
      icon: <FaMoneyBillWave className="text-yellow-400 mx-auto text-xl" />,
    },
  ];

  const statusCradsData = [
    {
      title: "KYC",
      value: 6,
      subtitle: "KYC",
      footer: "completed",
      footerNo: "6",
      color: "blue",
    },
    {
      title: "Active Users",
      value: 0,
      subtitle: "Users",
      footer: "completed",
      footerNo: "6",
      color: "green",
    },
    {
      title: "Revenue",
      value: "₹0",
      subtitle: "Revenue",
      footer: "completed",
      footerNo: "6",
      color: "violet",
    },
    {
      title: "Deposit Requests",
      value: 0,
      subtitle: "Deposit",
      footer: "completed",
      footerNo: "6",
      color: "gray",
    },
    {
      title: "Withdrawal Requests",
      value: 0,
      subtitle: "Withdrawal",
      footer: "completed",
      footerNo: "6",
      color: "yellow",
    },
    {
      title: "Active Providers",
      value: 0,
      subtitle: "Providers",
      footer: "completed",
      footerNo: "6",
      color: "green",
    },
  ];

  return (
    <div className="bg-gray-200 h-full min-h-screen">
      {/* Header Section */}
      <div className="w-full shadow-md bg-gray-100 rounded-b-xl -mt-1">
        <div className="p-5 flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Welcome Text */}
          <div>
            <h1 className="text-2xl font-bold pt-2">Welcome back, GoMedGo!</h1>
            <p className="text-sm pt-3 flex items-center gap-2 text-gray-500">
              <FaBell className="text-blue-500" /> You have 0 new messages and 0
              new tasks.
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6 md:mt-0 md:w-80 w-full">
            <div className="flex justify-between">
              {/* total Users  */}
              <div>
                <h2 className="text-lg font-semibold text-center">
                  Total Users
                </h2>
                <p className="text-3xl font-bold pt-2 text-center text-blue-500">
                  0
                </p>
              </div>

              {/* total providers */}
              <div>
                <h2 className="text-lg font-semibold text-center">
                  Total Providers
                </h2>
                <p className="text-3xl font-bold pt-2 text-center text-blue-500">
                  0
                </p>
              </div>
            </div>

            <div className="border-b border-gray-300 mt-3" />
            <div className="flex justify-between pt-4">
              {stats.map((item, i) => (
                <div key={i} className="text-center">
                  {item.icon}
                  <p className="text-sm text-gray-500 pt-2">{item.label}</p>
                  <p className="text-md font-bold">₹ {item.amount}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Section Title */}
        <h3 className="bg-gray-200 w-fit px-4 py-2 rounded-t-xl shadow-md font-semibold text-gray-700 ml-5">
          Dashboard
        </h3>
      </div>

      {/* Navigation Tabs */}
      <div className="p-5 text-gray-600">
        <div className="flex space-x-6">
          <button
            onClick={() => setStep(1)}
            className={`pb-2 -mb-[18px] ${
              step === 1
                ? "border-b-2 border-violet-400 text-violet-400 font-semibold"
                : "hover:text-violet-400"
            }`}>
            Home
          </button>
          <button
            onClick={() => setStep(2)}
            className={`pb-2 -mb-[18px] ${
              step === 2
                ? "border-b-2 border-violet-400 text-violet-400 font-semibold"
                : "hover:text-violet-400"
            }`}>
            Insights
          </button>
        </div>

        {/* Bottom underline below all tabs */}
        <div className="border-b-2 border-gray-300 mt-4" />
      </div>

      {/* Page Content */}
      <div className="p-5">
        {step === 1 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {statusCradsData.map((card, index) => (
              <StatusCards
                key={index}
                title={card.title}
                value={card.value}
                subtitle={card.subtitle}
                footer={card.footer}
                footerNo={card.footerNo}
                color={card.color}
              />
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold">Insights Content</h2>
            <p className="text-gray-600 mt-2">
              This is the insights section of the dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
