"use client";
import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { FaCamera } from "react-icons/fa";
import { toast } from "react-toastify";

interface UploadProfilePictureProps {
  onUploadSuccess?: (imageUrl: string) => void;
}

const UploadProfilePicture: React.FC<UploadProfilePictureProps> = ({ onUploadSuccess }) => {
  const { currentUser } = useAuth();
  const [previewUrl, setPreviewUrl] = useState<string>(currentUser?.profilePicture || "");
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please select a valid image file (JPEG or PNG)");
      return;
    }

    // Validate file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast.error("Image size must be less than 5MB");
      return;
    }

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    // Upload the file
    handleUpload(file);

    // Clean up
    return () => URL.revokeObjectURL(objectUrl);
  };

  // Handle file upload
  const handleUpload = async (file: File) => {
    if (!currentUser) {
      toast.error("You must be logged in to upload a profile picture");
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append("profilePicture", file);
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }

    try {
      console.log("Token before fetch:", localStorage.getItem("token"));
      const response = await fetch("/api/profile/upload-profile-picture", {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to upload profile picture");
      }

      toast.success("Profile picture updated successfully");
      onUploadSuccess?.(data.profilePicture);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      toast.error("Failed to upload profile picture");
      // Reset preview to previous image if upload fails
      setPreviewUrl(currentUser?.profilePicture || "");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    setPreviewUrl(currentUser?.profilePicture || "");
  }, [currentUser?.profilePicture]);

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="relative">
        <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 relative">
          {previewUrl ? (
            <Image src={previewUrl} alt="Profile picture" fill className="object-cover" sizes="(max-width: 128px) 100vw, 128px" priority />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-200">
              <span className="text-gray-400 text-4xl">{currentUser?.name?.[0]?.toUpperCase() || "?"}</span>
            </div>
          )}

          {/* Upload overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity cursor-pointer" onClick={triggerFileInput}>
            <FaCamera className="text-white text-2xl" />
          </div>
        </div>

        {/* Loading spinner */}
        {isUploading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-full">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500"></div>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input type="file" ref={fileInputRef} onChange={handleFileSelect} accept="image/jpeg,image/png,image/jpg" className="hidden" />

      {/* Upload button */}
      <button
        onClick={triggerFileInput}
        disabled={isUploading}
        className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isUploading ? "Uploading..." : "Change Profile Picture"}
      </button>
    </div>
  );
};

export default UploadProfilePicture;
