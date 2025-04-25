"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

interface StartChatButtonProps {
  userId: string; // receiverId
}

export default function StartChatButton({ userId }: StartChatButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { currentUser, isUserLoading } = useAuth(); // ✅ moved to component level

  const handleStartChat = async () => {
    const senderId = currentUser?._id;

    if (!senderId) {
      toast.error("User not authenticated.");
      return;
    }

    if (isUserLoading) {
      toast.error("User data is still loading. Try again in a moment.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/chats", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ senderId, receiverId: userId }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Failed to start chat");
      if (!data.chatId) throw new Error("Chat ID not found in response");

      router.push(`/chats/${data.chatId}`);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleStartChat}
      disabled={loading}
      className="cursor-pointer px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
    >
      {loading ? "Starting..." : "Start Chat"}
    </button>
  );
}
