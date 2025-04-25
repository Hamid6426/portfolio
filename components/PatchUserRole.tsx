"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

type Role = "donor" | "receiver";

const PatchUserRole: React.FC = () => {
  const router = useRouter();
  const { currentUser, loadUserProfile } = useAuth();
  const [newRole, setNewRole] = useState<Role>("donor");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // When currentUser changes, seed the select with their existing role
  useEffect(() => {
    if (currentUser && (currentUser.role === "donor" || currentUser.role === "receiver")) {
      setNewRole(currentUser.role);
    }
  }, [currentUser]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setNewRole(e.target.value as Role);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No auth token");

      await axiosInstance.patch("/api/profile/update-role", { newRole }, { headers: { Authorization: `Bearer ${token}` } });

      // Refresh the user object so currentUser.role updates immediately
      await loadUserProfile();
      router.push("/${newRole}");
      toast.success("Role updated successfully");
    } catch (err: any) {
      console.error("Error updating role:", err);
      toast.error("Failed to update role");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full bg-green-100 rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-semibold text-green-700 mb-4">Update My Role</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="newRole" className="block text-green-800 text-sm mb-1">
              Role:
            </label>
            <select
              id="newRole"
              name="newRole"
              value={newRole}
              onChange={handleChange}
              className="w-full border border-green-500 rounded-md px-3 py-2 focus:border-green-500 focus:ring-2 focus:ring-green-500"
            >
              <option value="donor">Donor</option>
              <option value="receiver">Receiver</option>
            </select>
          </div>
          <button type="submit" disabled={isSubmitting} className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 rounded-md transition disabled:opacity-50">
            {isSubmitting ? "Updating…" : "Update Role"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PatchUserRole;
