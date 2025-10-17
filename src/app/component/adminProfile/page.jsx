"use client";
import React, { useState } from "react";
import Image from "next/image";

const AdminProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState({
    name: "Ravi Sharma",
    email: "admin@gomedgo.com",
    phone: "+91 98765 43210",
    role: "Super Admin",
    address: "Bangalore, India",
    status: "Active",
  });

  const [updatedData, setUpdatedData] = useState(adminData);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setUpdatedData(adminData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setAdminData(updatedData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Admin Profile</h2>
          <button
            onClick={handleEditToggle}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        {/* Profile Info */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 w-full space-y-4">
            {/* Status */}
            <div>
              <label className="text-gray-600 text-sm">Status</label>
              <input
                type="text"
                name="name"
                value={adminData.status}
                readOnly={!isEditing}
                className={`w-full mt-1 p-2 rounded-lg border ${
                  isEditing
                    ? "border-blue-400 focus:outline-blue-500"
                    : "border-gray-200 bg-gray-100"
                }`}
              />
            </div>
            {/* Name */}
            <div>
              <label className="text-gray-600 text-sm">Full Name</label>
              <input
                type="text"
                name="name"
                value={isEditing ? updatedData.name : adminData.name}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full mt-1 p-2 rounded-lg border ${
                  isEditing
                    ? "border-blue-400 focus:outline-blue-500"
                    : "border-gray-200 bg-gray-100"
                }`}
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-600 text-sm">Email</label>
              <input
                type="email"
                name="email"
                value={isEditing ? updatedData.email : adminData.email}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full mt-1 p-2 rounded-lg border ${
                  isEditing
                    ? "border-blue-400 focus:outline-blue-500"
                    : "border-gray-200 bg-gray-100"
                }`}
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-gray-600 text-sm">Phone</label>
              <input
                type="text"
                name="phone"
                value={isEditing ? updatedData.phone : adminData.phone}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full mt-1 p-2 rounded-lg border ${
                  isEditing
                    ? "border-blue-400 focus:outline-blue-500"
                    : "border-gray-200 bg-gray-100"
                }`}
              />
            </div>

            {/* Role */}
            <div>
              <label className="text-gray-600 text-sm">Role</label>
              <input
                type="text"
                name="role"
                value={adminData.role}
                readOnly={!isEditing}
                className={`w-full mt-1 p-2 rounded-lg border ${
                  isEditing
                    ? "border-blue-400 focus:outline-blue-500"
                    : "border-gray-200 bg-gray-100"
                }`}
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-gray-600 text-sm">Address</label>
              <textarea
                name="address"
                value={isEditing ? updatedData.address : adminData.address}
                onChange={handleChange}
                readOnly={!isEditing}
                className={`w-full mt-1 p-2 rounded-lg border ${
                  isEditing
                    ? "border-blue-400 focus:outline-blue-500"
                    : "border-gray-200 bg-gray-100"
                }`}
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Save Button */}
        {isEditing && (
          <div className="flex justify-end mt-6">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfile;
