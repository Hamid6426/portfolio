"use client";

import React, { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const Signin: React.FC = () => {
  const router = useRouter();
  const { loadUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await axiosInstance.post("/api/auth/login", formData);
      const token = res.data.token;
      localStorage.setItem("token", token);

      await loadUserProfile();
      toast.success("Login successful!");

      router.push("/listing");
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-300 px-4">
      <div className="w-full max-w-md bg-green-100 shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-green-700 mb-6 text-center">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-green-800 text-sm mb-1">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border border-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-md px-3 py-2"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-green-800 text-sm mb-1">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full border border-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 rounded-md px-3 py-2"
            />
          </div>
          <button type="submit" disabled={isLoading} className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-200">
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
