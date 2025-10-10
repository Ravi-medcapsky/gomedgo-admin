import Image from "next/image";
import React from "react";
import { GoDotFill } from "react-icons/go";
import { PiGreaterThanBold } from "react-icons/pi";

const HeroSection = ({ title, title2 }) => {
  return (
    <div>
      <div className="w-full h-55 bg-green-300 rounded-b-xl">
        <div className="w-full h-8 bg-gray-900 ">
          <h1 className="text-white flex p-1 gap-2">Notifications</h1>
        </div>

        <h1 className="text-4xl pl-8 pt-6 text-white">{title}</h1>

        <h3 className="text-white text-lg pl-8 pt-3 flex items-center gap-4">
          Home <GoDotFill /> {title2}
        </h3>
      </div>
    </div>
  );
};

export default HeroSection;
