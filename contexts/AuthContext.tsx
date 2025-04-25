// contexts/AuthContext.tsx
"use client";
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";

interface AuthenticatedUser {
  _id: string;
  email: string;
  name: string;
  role: string;

  isVerified: boolean;
  verifiedAt: string | null;

  country: string | null;
  state: string | null;
  city: string | null;
  street: string | null;
  zipCode: string | null;
  address: string | null;
  phone: string | null;

  whatsapp: string | null;
  telegram: string | null;
  discord: string | null;
  facebook: string | null;
  twitter: string | null;
  instagram: string | null;
  linkedin: string | null;
  tiktok: string | null;

  bio: string | null;
  profilePicture: string | null;

  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  currentUser: AuthenticatedUser | null;
  isUserLoading: boolean;
  // you can still expose these if you need them:
  setCurrentUser: React.Dispatch<React.SetStateAction<AuthenticatedUser | null>>;
  loadUserProfile: () => Promise<void>;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<AuthenticatedUser | null>(null);
  const [isUserLoading, setIsUserLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  // Prevent multiple fetches
  const hasFetchedProfile = useRef(false);

  const loadUserProfile = async () => {
    setIsUserLoading(true);
    const token = localStorage.getItem("token");
    if (!token) {
      setCurrentUser(null);
      setIsUserLoading(false);
      setToken(localStorage.getItem("token"));
      return;
    }

    try {
      console.log("Token before fetch:", localStorage.getItem("token"));
      const res = await axiosInstance.get("/api/profile/get", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCurrentUser(res.data);
    } catch (error) {
      console.error("Failed to load user profile:", error);
      localStorage.removeItem("token");
      setCurrentUser(null);
    } finally {
      setIsUserLoading(false);
    }
  };

  useEffect(() => {
    // only fetch once per full app lifetime
    if (!hasFetchedProfile.current) {
      hasFetchedProfile.current = true;
      loadUserProfile();
    }
  }, []);

  return <AuthContext.Provider value={{ currentUser, setCurrentUser, loadUserProfile, isUserLoading, token }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be inside AuthProvider");
  return ctx;
};
