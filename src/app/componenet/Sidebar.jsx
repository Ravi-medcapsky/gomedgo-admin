"use client";
import React from "react";
import {
  MdDashboard,
  MdPeopleAlt,
  MdBusinessCenter,
  MdGroups,
  MdAttachMoney,
  MdFolderOpen,
  MdMail,
  MdAccountBalanceWallet,
  MdEventNote,
  MdTrendingUp,
} from "react-icons/md";
import { FaUserTie } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const menu = [
    {
      id: 1,
      name: "Dashboard",
      link: "/pages/dashboard", 
      icon: <MdDashboard />,
    },
    {
      id: 2,
      name: "Manager",
      link: "/pages/manager",
      icon: <FaUserTie />,
    },
    {
      id: 3,
      name: "Providers",
      link: "/pages/provider",
      icon: <MdBusinessCenter />,
    },
    {
      id: 4,
      name: "Clients",
      link: "/pages/clients",
      icon: <MdPeopleAlt />,
    },
    {
      id: 5,
      name: "Transactions",
      link: "/pages/transaction",
      icon: <MdAttachMoney />,
    },
    {
      id: 6,
      name: "Trading Account",
      link: "/pages/tradingAccount",
      icon: <MdTrendingUp />,
    },
    {
      id: 7,
      name: "Documents",
      link: "/pages/documents",
      icon: <MdFolderOpen />,
    },
    {
      id: 8,
      name: "Manage Group",
      link: "/pages/manageGroup",
      icon: <MdGroups />,
    },
    {
      id: 9,
      name: "Mail Template",
      link: "/pages/mailTemplate",
      icon: <MdMail />,
    },
    {
      id: 10,
      name: "Wallet Management",
      link: "/pages/walletManagement",
      icon: <MdAccountBalanceWallet />,
    },
    {
      id: 11,
      name: "Activities",
      link: "/pages/activities",
      icon: <MdEventNote />,
    },
  ];

  return (
    <aside
      className="bg-gray-800 text-white h-['100%'] w-64 p-4 "
      aria-label="Main navigation"
      
    >
      <h1 className="text-center text-xl font-bold mb-4">Administrator</h1>

      <div className="border-b border-gray-700 mb-4" />

      <h1 className=" mb-4">Home</h1>

      <nav>
        <ul className="space-y-1" role="list">
          {menu.map((item) => {
            const isActive = pathname === item.link;
            return (
              <li key={item.id}>
                <button
                  onClick={() => router.push(item.link)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex items-center gap-3 w-full text-left px-4 py-2 rounded transition 
                  ${
                    isActive
                      ? "bg-green-600 text-white"
                      : "hover:bg-gray-700 text-gray-200"
                  }`}
                >
                  <span className="text-xl" aria-hidden="true">
                    {item.icon}
                  </span>
                  <span>{item.name}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
