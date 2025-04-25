"use client";
import React, { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";

interface Item {
  _id: string;
  title: string;
  description: string;
  [key: string]: any;
}

interface Props {
  item: Item;
  onUpdated?: (item: Item) => void;
}

const EditItemForm: React.FC<Props> = ({ item, onUpdated }) => {
  const [formData, setFormData] = useState<Item>(item);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Unauthorized");

    try {
      setLoading(true);
      const res = await axiosInstance.patch(`/api/items/${item._id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Item updated!");
      if (onUpdated) onUpdated(res.data);
    } catch (err: any) {
      console.error(err);
      toast.error(err.response?.data?.error || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        className="w-full border p-2 rounded"
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
};

export default EditItemForm;
