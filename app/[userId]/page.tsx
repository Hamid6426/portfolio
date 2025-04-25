"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import StartChatButton from "@/components/StartAChatButton";
import { useAuth } from "@/contexts/AuthContext";
import axiosInstance from "@/lib/axiosInstance";

const formatDate = (date: string | null) => {
  if (!date) return "Not Available";
  const d = new Date(date);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}-${dd}-${d.getFullYear()}`;
};

const PublicProfile = () => {
  const { currentUser, isUserLoading } = useAuth();
  const [fetchedUser, setFetchedUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams() as { userId: string };

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axiosInstance.get(`/api/users/${userId}`, {});
        setFetchedUser(res.data);
      } catch (err) {
        console.error("Error fetching user:", err);
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, [userId]);

  if (loading) return <p>Loading...</p>;
  if (!fetchedUser) return <p>User not found.</p>;
  if (isUserLoading) return <p>Loading...</p>;
  if (!currentUser) return <p>User not found or not logged in.</p>;

  const formField = (label: string, value: string | null, type = "text") => (
    <div>
      <label className="block text-green-800 text-sm mb-1">{label}:</label>
      <input
        type={type}
        value={value ?? "Not Added"}
        readOnly
        className="w-full border border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500 rounded-md px-3 py-2 mb-4 bg-gray-100"
      />
    </div>
  );

  return (
    <div className="max-w-sm mx-auto">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-2xl font-bold my-6 text-green-800">User Profile</h1>
        <StartChatButton userId={userId} />
      </div>

      <div className="mb-4">
        {fetchedUser.profilePicture ? (
          <Image width={40} height={40} src={fetchedUser.profilePicture} alt="Profile Picture" className="w-32 h-32 object-cover rounded-full" />
        ) : (
          <>
            <label className="block text-green-800 text-sm mb-1">Profile Picture:</label>
            <p className="text-red-500">No profile picture available</p>
          </>
        )}
      </div>

      {formField("Name", fetchedUser.name)}
      {formField("Email", fetchedUser.email, "email")}
      {formField("Role", fetchedUser.role?.toUpperCase())}
      {formField("Phone", fetchedUser.phone)}
      {formField("Country", fetchedUser.country)}
      {formField("State", fetchedUser.state)}
      {formField("City", fetchedUser.city)}
      {formField('Joined "Share n Care" since', formatDate(fetchedUser.createdAt))}
    </div>
  );
};

export default PublicProfile;
