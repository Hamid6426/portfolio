"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";

interface AccountInfo {
  name: string;
  email: string;
}

const PatchAccountInfo: React.FC = () => {
  const { currentUser, loadUserProfile } = useAuth();
  const [accountInfo, setAccountInfo] = useState<AccountInfo>({
    name: "",
    email: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form with current user info
  useEffect(() => {
    if (currentUser) {
      setAccountInfo({
        name: currentUser.name || "",
        email: currentUser.email || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in.");
      setIsSubmitting(false);
      return;
    }

    try {
      await axiosInstance.patch("/api/profile/update", accountInfo, {
        headers: { Authorization: `Bearer ${token}` },
      });
      await loadUserProfile();
      toast.success("Account information updated successfully");
    } catch (error: any) {
      console.error("Error updating account info:", error);
      toast.error("Failed to update account information");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full bg-green-100 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Account Information</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-green-800 text-sm mb-1">
              Name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={accountInfo.name}
              onChange={handleChange}
              required
              className="w-full border border-green-500 rounded-md px-3 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-green-800 text-sm mb-1">
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={accountInfo.email}
              onChange={handleChange}
              required
              className="w-full border border-green-500 rounded-md px-3 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" disabled={isSubmitting} className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md transition disabled:opacity-50">
            {isSubmitting ? "Updating…" : "Update Account Info"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatchAccountInfo;
