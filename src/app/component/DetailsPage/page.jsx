"use client";
import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import HeroSection from "../HeroSection";
import Image from "next/image";
import logoimg from "../../../../public/logo.png"; // ✅ correct import

const DetailsPage = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const [step, setStep] = useState(1);

  return (
    <div>
      {type === "provider" ? (
        <div className="w-full mb-4">
          <HeroSection title="Provider Profile" title2="Provider account" />

          <div className="max-w-[96%] mx-auto -mt-6">
            <div className="bg-white shadow-lg rounded-lg px-6 py-4">
              {/* Tabs */}
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

            {/* Content */}
            {step === 1 && (
              <div className="flex flex-col md:flex-row gap-6 mt-6">
                {/* Left Card */}
                <div className="w-full md:w-1/3 bg-white shadow-lg rounded-lg ">
                  <div className="text-center">
                    {/* ✅ Show image or fallback initial */}
                    <Image
                      src={logoimg}
                      alt="Provider"
                      width={120}
                      height={120}
                      className="mx-auto rounded-full border"
                    />
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Provider Name
                    </h3>
                  </div>

                  <div className="space-y-3 ml-4 mt-4 text-sm">
                    <div>
                      <p className="font-semibold text-gray-600">Email</p>
                      <p className="text-gray-400">a@gmail.com</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600">Phone</p>
                      <p className="text-gray-400">1234567890</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600">
                        Date of Joining
                      </p>
                      <p className="text-gray-400">00/00/0000</p>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-600">
                        Total Visits
                      </p>
                      <p className="text-gray-400">00</p>
                    </div>
                  </div>
                </div>

                {/* Right Card */}
                <div className="w-full md:w-2/3 bg-white shadow-lg rounded-lg p-6">
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                    Provider Profile Details
                  </h2>
                  <p className="text-gray-600">
                    Here you can show the provider’s full details, ratings,
                    address, services provided, and more.
                  </p>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Order History
                </h2>
                <p className="text-gray-600">
                  Provider’s past orders will be listed here.
                </p>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  Transaction History
                </h2>
                <p className="text-gray-600">
                  All provider payment transactions here.
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <HeroSection title="User Profile" title2="User account" />
      )}
    </div>
  );
};

export default DetailsPage;
