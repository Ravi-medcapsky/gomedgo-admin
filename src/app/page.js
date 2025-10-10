import Image from "next/image";
import Header from "./componenet/Header";
import Sidebar from "./componenet/Sidebar";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Welcome to GoMedGo Admin</h1>
      <p className="text-gray-600">
        Select an option from the sidebar to get started.
      </p>
    </div>
  );
}
