"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";

type ResumeModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed h-screen inset-0 z-[60] bg-background flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gray-900 rounded-lg shadow-lg p-6 w-80"
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <h2 className="text-xl font-bold mb-4 text-center text-white">Resume Options</h2>

            <div className="flex flex-col gap-4">
              <a
                href="/Mian_Hamid_Ur_Rehman_Resume.pdf"
                download
                className="bg-primary text-white py-2 px-4 rounded hover:bg-accent text-center"
              >
                Download - Light Version
              </a>
              <a
                href="/Mian_Hamid_Ur_Rehman_CV.pdf"
                download
                className="bg-primary text-white py-2 px-4 rounded hover:bg-accent text-center"
              >
                Download - Dark Version
              </a>
            </div>

            <button
              onClick={onClose}
              className="mt-4 cursor-pointer text-gray-400 hover:text-white hover:underline block mx-auto"
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
