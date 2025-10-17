"use client";
import React, { useState } from "react";

const CreateAdmin = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "active",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 🧠 For now, just show success locally
    console.log("Admin Created:", formData);
    setMessage("✅ Admin created successfully!");
    setFormData({
      name: "",
      email: "",
      phone: "",
      role: "",
      status: "active",
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Create New Admin
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter admin name"
              required
              className="w-full mt-1 p-2 border rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="text-sm text-gray-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
              className="w-full mt-1 p-2 border rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              required
              className="w-full mt-1 p-2 border rounded-lg focus:outline-blue-500"
            />
          </div>

          {/* Role */}
          <div>
            <label className="text-sm text-gray-600">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="w-full mt-1 p-2 border rounded-lg focus:outline-blue-500"
            >
              <option value="">Select Role</option>
              <option value="superadmin">Super Admin</option>
              <option value="manager">Manager</option>
              <option value="support">Support</option>
            </select>
          </div>

          {/* Status */}
          <div>
            <label className="text-sm text-gray-600">Status</label>
            <div className="flex gap-6 mt-1">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="active"
                  checked={formData.status === "active"}
                  onChange={handleChange}
                />
                <span>Active</span>
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="status"
                  value="inactive"
                  checked={formData.status === "inactive"}
                  onChange={handleChange}
                />
                <span>Inactive</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Create Admin
          </button>

          {/* Message */}
          {message && (
            <p className="text-green-600 text-center mt-3 font-medium">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateAdmin;
