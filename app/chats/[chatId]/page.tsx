"use client";

import { useEffect, useState, useRef } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "react-toastify";

interface IMessage {
  _id: string;
  chatId: string;
  sender: string;
  text: string;
  timestamp: string;
}

export default function ChatRoom() {
  const { chatId } = useParams() as { chatId: string };
  const { currentUser, isUserLoading } = useAuth();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/messages?chatId=${chatId}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to fetch messages");

      setMessages(data);
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Could not load chat");
    } finally {
      setLoading(false);
    }
  };

  // Add this useEffect for periodic fetching
  useEffect(() => {
    if (!isUserLoading && currentUser) {
      // Fetch immediately
      fetchMessages();
      
      // Then set up interval for every 5 seconds
      const intervalId = setInterval(fetchMessages, 10000);
      
      // Clean up interval on component unmount
      return () => clearInterval(intervalId);
    }
  }, [chatId, isUserLoading, currentUser, fetchMessages]);

  const handleSendMessage = async () => {
    const token = localStorage.getItem("token");
    if (!token || !messageText.trim()) return;

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ chatId, text: messageText }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send message");

      setMessages((prev) => [...prev, data]);
      setMessageText("");
    } catch (err: any) {
      toast.error(err.message || "Message failed");
    }
  };

  useEffect(() => {
    // Scroll to bottom on new message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (loading || isUserLoading) return <p>Loading chat...</p>;
  if (!currentUser) return <p>User not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-xl font-bold text-green-700 mb-4">Chat</h1>

      <div className="h-[60vh] overflow-y-auto bg-gray-100 rounded p-4 space-y-3">
        {messages.map((msg) => (
          <div
            key={msg._id}
            className={`p-2 rounded max-w-[75%] ${
              msg.sender === currentUser._id ? "bg-green-500 text-white ml-auto" : "bg-white text-gray-800"
            }`}
          >
            <p className="text-sm">{msg.text}</p>
            <p className="text-xs text-right mt-1">
              {msg.sender === currentUser._id ? "You" : "Other"} •{" "}
              {new Date(msg.timestamp).toLocaleTimeString()}
            </p>
          </div>
        ))}
        <div ref={messagesEndRef}></div>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          className="flex-1 border border-green-400 rounded px-4 py-2"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Send
        </button>
      </div>
    </div>
  );
}