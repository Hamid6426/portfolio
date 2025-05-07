"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import { MdLocationOn, MdLocationPin, MdMail, MdPhone } from "react-icons/md";

const ContactForm = () => {
  // 1. State
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  // 2. handleChange
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // 3. handleSubmit
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // TODO: replace with real submission (e.g. API call)
    console.log("Form submitted:", form);
    // clear
    setForm({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="py-6 mx-auto flex flex-col w-full lg:flex-row max-w-5xl place-items-center gap-6">
      <form
        onSubmit={handleSubmit}
        className="prose prose-blue mx-auto w-2/3 px-3 space-y-6 text-text"
      >
        <h2 className="text-3xl font-semibold  text-primary mb-4">
          Let's work together
        </h2>
        <p>
          I would love to hear from you! Please fill out the form below with
          your details and message and I will get back to you shortly.
        </p>

        <div className="flex gap-6 w-full">
          {/* First Name */}
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={form.firstName}
            onChange={handleChange}
            required
            placeholder="First Name"
            className="w-full px-4 py-2 border-[0.5px] border-primary focus:outline-none focus:ring-2 focus:ring-primary  "
          />
          {/* Last Name */}
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={form.lastName}
            onChange={handleChange}
            required
            placeholder="Last Name"
            className="w-full px-4 py-2 border-[0.5px] border-primary focus:outline-none focus:ring-2 focus:ring-primary  "
          />
        </div>

        <div className="flex gap-6 w-full">
          {/* Email */}
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email Address"
            className="w-full px-4 py-2 border-[0.5px] border-primary focus:outline-none focus:ring-2 focus:ring-primary  "
          />
          {/* Phone */}
          <input
            id="phone"
            name="phone"
            type="phone"
            value={form.phone}
            onChange={handleChange}
            required
            placeholder="Phone Number"
            className="w-full px-4 py-2 border-[0.5px] border-primary focus:outline-none focus:ring-2 focus:ring-primary  "
          />
        </div>

        {/* Subject */}
        <div className="flex flex-col">
          <textarea
            id="subject"
            name="subject"
            rows={5}
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="w-full px-4 py-2 border-[0.5px] border-primary focus:outline-none focus:ring-2 focus:ring-primary   resize-none"
          />
        </div>
        {/* Message */}
        <div className="flex flex-col">
          <textarea
            id="message"
            name="message"
            rows={5}
            value={form.message}
            onChange={handleChange}
            placeholder="Message"
            required
            className="w-full px-4 py-2 border-[0.5px] border-primary focus:outline-none focus:ring-2 focus:ring-primary   resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="px-6 py-2 font-bold bg-primary text-white hover:bg-accent  "
        >
          Send Message
        </button>
      </form>

      <div className="w-1/3 gap-6 flex flex-col text-text">
        <div className="flex">
          <div className="bg-primary h-14 w-14 flex items-center justify-center">
            <MdMail size={32} className="text-white" />
          </div>
          <div className="space-y-1 ml-4">
            <div className="text-primary text-xl font-bold">Email</div>
            <div className="">MianHamid6426@gmail.com</div>
          </div>
        </div>

        <div className="flex">
          <div className="bg-primary h-14 w-14 flex items-center justify-center">
            <MdPhone size={32} className="text-white" />
          </div>
          <div className="space-y-1 ml-4">
            <div className="text-primary text-xl font-bold">Phone</div>
            <div className="">+93145711577</div>
          </div>
        </div>

        <div className="flex">
          <div className="bg-primary h-14 w-14 flex items-center justify-center">
            <MdLocationPin size={32} className="text-white" />
          </div>
          <div className="space-y-1 ml-4">
            <div className="text-primary text-xl font-bold">Address</div>
            <div className="">Nowshera, Khtber Pakhtunkhwa, Pakistan</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
