"use client";

import React, { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";

const Signup: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/api/auth/register", formData);
      toast.success(res.data.message || "Registered successfully!");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to register.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-300 px-4">
      <div className="w-full max-w-md bg-green-100 shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-green-800 text-sm mb-1">Name:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              required
              className="w-full border border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-green-800 text-sm mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              required
              className="w-full border border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-green-800 text-sm mb-1">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
              required
              className="w-full border border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500 rounded-md px-3 py-2"
            />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-200">
            {isLoading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
