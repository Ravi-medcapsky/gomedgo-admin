"use client";
import React, { useState } from "react";

const Services = () => {
  const initialServices = [
    {
      image: null,
      preview:
        "https://images.unsplash.com/photo-1588776814546-85d1b9b9b13d?auto=format&fit=crop&w=800&q=60",
      name: "General Consultation",
      type: "Doctor Service",
      price: "500",
      properties: ["30 mins", "In-person", "Prescription included"],
      about:
        "A short in-person consultation with a certified doctor to discuss health concerns and get medical advice.",
    },
    {
      image: null,
      preview:
        "https://images.unsplash.com/photo-1600959907703-10aa0d6d03b3?auto=format&fit=crop&w=800&q=60",
      name: "Blood Test",
      type: "Laboratory",
      price: "350",
      properties: ["Home Sample Pickup", "Reports in 24 hrs"],
      about:
        "Fast and accurate diagnostic blood tests with home collection and online report delivery.",
    },
  ];

  const [services, setServices] = useState(initialServices);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    preview: "",
    name: "",
    type: "",
    price: "",
    properties: "",
    about: "",
  });

  const [view, setView] = useState("list"); // 'list' or 'form'

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
        preview: URL.createObjectURL(file),
      }));
    }
  };

  // Add or Update Service
  const handleSubmit = (e) => {
    e.preventDefault();
    const newService = {
      ...formData,
      properties: formData.properties
        ? formData.properties.split(",").map((p) => p.trim())
        : [],
    };

    if (editingIndex !== null) {
      const updated = [...services];
      updated[editingIndex] = newService;
      setServices(updated);
      setEditingIndex(null);
    } else {
      setServices([...services, newService]);
    }

    // Reset form and go back to list
    setFormData({
      image: null,
      preview: "",
      name: "",
      type: "",
      price: "",
      properties: "",
      about: "",
    });
    setView("list");
  };

  // Delete Service
  const handleDelete = (index) => {
    const updated = services.filter((_, i) => i !== index);
    setServices(updated);
  };

  // Edit Service
  const handleEdit = (index) => {
    const s = services[index];
    setFormData({
      image: s.image,
      preview: s.preview,
      name: s.name,
      type: s.type,
      price: s.price,
      properties: s.properties.join(", "),
      about: s.about,
    });
    setEditingIndex(index);
    setView("form");
  };

  // Render List View
  if (view === "list") {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">Manage Services</h2>
          <button
            onClick={() => {
              setFormData({
                image: null,
                preview: "",
                name: "",
                type: "",
                price: "",
                properties: "",
                about: "",
              });
              setEditingIndex(null);
              setView("form");
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
          >
            Add Service
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-lg p-4 flex flex-col justify-between"
            >
              {s.preview && (
                <img
                  src={s.preview}
                  alt={s.name}
                  className="h-40 w-full object-cover rounded-md mb-3"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-800">{s.name}</h3>
              <p className="text-gray-500 text-sm">Type: {s.type}</p>
              <p className="text-gray-700 font-medium mt-1">₹{s.price}</p>

              <div className="mt-2">
                <h4 className="font-medium text-gray-700 text-sm">Key Properties:</h4>
                <ul className="text-gray-500 text-sm list-disc ml-5">
                  {s.properties.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>

              <p className="text-gray-600 text-sm mt-2">{s.about}</p>

              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleEdit(index)}
                  className="text-blue-500 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Render Form View
  return (
    <div className="max-w-3xl mx-auto p-6">
      <button
        onClick={() => setView("list")}
        className="text-gray-500 hover:underline mb-4"
      >
        ← Back to Services
      </button>
      <h2 className="text-2xl font-semibold mb-4">
        {editingIndex !== null ? "Edit Service" : "Add Service"}
      </h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Poster Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
          {formData.preview && (
            <img
              src={formData.preview}
              alt="Preview"
              className="mt-2 h-24 w-24 object-cover rounded-md border"
            />
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Service Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Service Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Price (₹)</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Key Properties (comma separated)
          </label>
          <input
            type="text"
            name="properties"
            value={formData.properties}
            onChange={handleChange}
            placeholder="e.g. Fast, Reliable, Affordable"
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">About Service</label>
          <textarea
            name="about"
            value={formData.about}
            onChange={handleChange}
            rows="3"
            className="mt-1 w-full border border-gray-300 rounded-md p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
        >
          {editingIndex !== null ? "Update Service" : "Add Service"}
        </button>
      </form>
    </div>
  );
};

export default Services;
