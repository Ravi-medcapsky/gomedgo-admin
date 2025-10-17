"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { IoIosNotifications } from "react-icons/io";

const Header = () => {
  const router = useRouter();

  const handleProfileClick = () => {
    router.push("/component/adminProfile");
  };

  return (
    <header className="flex items-center px-4 py-2 bg-white shadow-xl w-full h-16 ">
      {/* Logo and Brand Name */}
      <div className="flex items-center space-x-2">
        <Image
          src="/logo_no_bg.png"
          alt="GoMedGo logo"
          width={50}
          height={50}
          priority
        />
        <h1 className="text-lg font-semibold text-gray-800">
          Go<span className="text-green-700">Med</span>Go
        </h1>
      </div>

      {/* Right-side Icons */}
      <ul className="flex items-center space-x-3 ml-auto">
        <li>
          <button
            onClick={handleProfileClick}
            aria-label="Notifications"
            className="text-xl bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition">
            <IoIosNotifications />
          </button>
        </li>
        <li>
          <button
            onClick={handleProfileClick}
            aria-label="Profile"
            className="text-xl bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition">
            <BsFillPersonFill />
          </button>
        </li>
      </ul>
    </header>
  );
};

export default Header;
