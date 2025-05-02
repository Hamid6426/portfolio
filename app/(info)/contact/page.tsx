"use client";

import { useState, FormEvent, ChangeEvent } from "react";

const ContactForm = () => {
  // 1. State
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  // 2. handleChange
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 3. handleSubmit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: replace with real submission (e.g. API call)
    console.log("Form submitted:", form);
    // clear
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="pt-12 ">
    <form
      onSubmit={handleSubmit}
      className="prose prose-blue mx-auto max-w-xl w-full border border-white p-6 space-y-6 text-text"
    >
      <h2 className="text-3xl font-semibold  text-primary mb-4">Contact Me</h2>

      {/* Name */}
      <div className="flex flex-col">
        <label htmlFor="name" className="mb-2 font-medium">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-white focus:outline-none focus:ring-2 focus:ring-primary rounded"
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label htmlFor="email" className="mb-2 font-medium">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-white focus:outline-none focus:ring-2 focus:ring-primary rounded"
        />
      </div>

      {/* Message */}
      <div className="flex flex-col">
        <label htmlFor="message" className="mb-2 font-medium">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          value={form.message}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-white focus:outline-none focus:ring-2 focus:ring-primary rounded resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="px-6 py-2 font-bold bg-primary hover:bg-accent rounded"
      >
        Send Message
      </button>
    </form>
    </div>
  );
};

export default ContactForm;
