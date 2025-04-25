"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { toast } from "react-toastify";

interface IChat {
  _id: string;
  chatId: string;
  participants: string[];
  updatedAt: string;
}

export default function MyChats() {
  const { currentUser, isUserLoading } = useAuth();
  const [chats, setChats] = useState<IChat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      const token = localStorage.getItem("token"); // ✅ Get token from localStorage manually

      if (!token || !currentUser?._id) return;

      try {
        const res = await fetch("/api/chats", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch chats");
        }

        setChats(data);
      } catch (err: any) {
        console.error(err);
        toast.error(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (!isUserLoading && currentUser) {
      fetchChats();
    }
  }, [isUserLoading, currentUser]);

  if (isUserLoading || loading) return <p>Loading chats...</p>;

  if (!chats.length) return <p>No chats yet.</p>;

  return (
    <div className="max-w-md mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-green-800">My Chats</h1>
      <ul className="space-y-4">
        {chats.map((chat) => {
          const otherUserId = chat.participants.find((id) => id !== currentUser?._id);
          return (
            <li key={chat._id} className="border border-green-400 rounded p-4 bg-white hover:bg-green-50 transition">
              <Link href={`/chats/${chat.chatId}`}>
                <div className="text-lg font-medium text-green-700">
                  Chat with user: <span className="font-bold">{otherUserId}</span>
                </div>
                <div className="text-sm text-gray-500">
                  Last updated: {new Date(chat.updatedAt).toLocaleString()}
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
