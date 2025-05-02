// components/ResumeModal.tsx
"use client";

import React from "react"; // ✅ This is required

type ResumeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Resume Options</h2>
        <div className="flex flex-col gap-4">
          <a href="/Mian_Hamid_Ur_Rehman_Resume.pdf" download className="bg-primary text-white py-2 px-4 rounded hover:bg-accent text-center">
            Download - Light Version
          </a>
          <a href="/Mian_Hamid_Ur_Rehman_Resume.pdf" download className="bg-primary text-white py-2 px-4 rounded hover:bg-accent text-center">
            Download - Dark Version
          </a>
        </div>
        <button onClick={onClose} className="mt-4 cursor-pointer text-gray-500 hover:underline block mx-auto">
          Close
        </button>
      </div>
    </div>
  );
}
