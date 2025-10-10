"use client";
import React from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";

export const StatusCards = ({
  title,
  value,
  subtitle,
  footer,
  footerNo,
  color,
  onClick,
}) => {
  // Tailwind-safe color map
  const colorMap = {
    blue: "text-blue-400",
    red: "text-red-400",
    green: "text-green-400",
    yellow: "text-yellow-400",
    violet: "text-violet-400",
    gray: "text-gray-400",
  };

  const textColor = colorMap[color] || colorMap.blue;

  return (
    <div className="bg-white p-4  rounded-lg shadow-md mb-6 w-45">
      {/* Header */}
      <div className="flex items-center mb-4">
        <h2 className="text-gray-700">{title}</h2>
        <button onClick={onClick} className="text-gray-500 hover:text-gray-700 ml-auto">
          <BiDotsVerticalRounded size={20}  />
        </button>
      </div>

      {/* Body */}
      <div className="text-center">
        <h3 className={`text-4xl font-bold ${textColor}`}>{value}</h3>
        <p className={`${textColor} font-medium mb-3`}>{subtitle}</p>
        <p className="text-gray-600">
          {footer}: {footerNo}{" "}
        </p>
      </div>
    </div>
  );
};
