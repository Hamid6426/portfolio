"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "react-toastify";

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const verificationToken = searchParams.get("verificationToken");
  const [isLoading, setIsLoading] = useState(false);

  const handleVerify = async () => {
    if (!verificationToken) {
      toast.error("Verification token is missing from the URL.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await axiosInstance.post("/api/auth/verify-email", {
        verificationToken: verificationToken,
      });
      toast.success(res.data.message || "Email verified successfully!");
      router.push("/signin")
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Verification failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-300 px-4">
      <div className="w-full max-w-md bg-green-100 shadow-lg rounded-lg p-8 text-center">
        <h2 className="text-2xl font-bold text-green-700 mb-6">Verify Your Email</h2>
        <p className="text-green-800 mb-4">
          Click the button below to verify your email.
        </p>
        <button
          onClick={handleVerify}
          disabled={isLoading || !verificationToken}
          className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md transition duration-200"
        >
          {isLoading ? "Verifying..." : "Verify Email"}
        </button>
      </div>
    </div>
  );
};

export default VerifyEmail;
