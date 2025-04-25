"use client";
import React, { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";

interface Props {
  itemId: string;
  onDeleted?: () => void;
}

const DeleteItemButton: React.FC<Props> = ({ itemId, onDeleted }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Unauthorized");

    try {
      setDeleting(true);
      await axiosInstance.delete(`/api/items/${itemId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Item deleted");
      if (onDeleted) onDeleted();
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      disabled={deleting}
    >
      {deleting ? "Deleting..." : "Delete Item"}
    </button>
  );
};

export default DeleteItemButton;
