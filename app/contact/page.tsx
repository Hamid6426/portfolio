"use client";

import axiosInstance from "@/lib/axiosInstance";
import { useState, FormEvent, ChangeEvent } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { MdLocationPin, MdMail, MdPhone } from "react-icons/md";
import { toast } from "react-toastify";

const ContactForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const toastId = toast.loading("Sending your message...");

    try {
      await axiosInstance.post("/api/mail", form);
      toast.update(toastId, {
        render: "Message sent successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      toast.update(toastId, {
        render: "Failed to send message. Try again later.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
        closeOnClick: true,
        draggable: true,
      });
      console.error("Failed to send message", err);
    }
  };

  return (
    <div className="py-20 w-full bg-background">
      <div className="flex flex-col lg:flex-row gap-6">
        <form
          onSubmit={handleSubmit}
          className="max-w-5xl mx-auto w-full px-6 lg:px-3 lg:w-2/3 space-y-6 text-paragraph"
        >
          <h2 className="text-3xl font-semibold mb-4 text-primary">
            Let&apos;s work together
          </h2>
          <p>
            I would love to hear from you! Please fill out the form below with
            your details and message and I will get back to you shortly.
          </p>

          <div className="block lg:flex items-center space-y-6 lg:space-y-0 gap-6 w-full">
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={form.firstName}
              onChange={handleChange}
              required
              placeholder="First Name"
              className="w-full px-4 py-2 border border-primary rounded bg-card text-paragraph focus:outline-none focus:ring-2 focus:ring-primary-alpha"
            />
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={form.lastName}
              onChange={handleChange}
              required
              placeholder="Last Name"
              className="w-full px-4 py-2 border border-primary rounded bg-card text-paragraph focus:outline-none focus:ring-2 focus:ring-primary-alpha"
            />
          </div>

          <div className="block lg:flex items-center space-y-6 lg:space-y-0 gap-6 w-full">
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Email Address"
              className="w-full px-4 py-2 border border-primary rounded bg-card text-paragraph focus:outline-none focus:ring-2 focus:ring-primary-alpha"
            />
            <input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              required
              placeholder="Phone Number"
              className="w-full px-4 py-2 border border-primary rounded bg-card text-paragraph focus:outline-none focus:ring-2 focus:ring-primary-alpha"
            />
          </div>

          <textarea
            id="subject"
            name="subject"
            rows={1}
            value={form.subject}
            onChange={handleChange}
            placeholder="Subject"
            required
            className="w-full px-4 py-2 border border-primary rounded resize-none bg-card text-paragraph focus:outline-none focus:ring-2 focus:ring-primary-alpha"
          />

          <textarea
            id="message"
            name="message"
            rows={8}
            value={form.message}
            onChange={handleChange}
            placeholder="Message"
            required
            className="w-full px-4 py-2 border border-primary rounded resize-none bg-card text-paragraph focus:outline-none focus:ring-2 focus:ring-primary-alpha"
          />

          <button
            type="submit"
            className="px-6 py-2 font-bold rounded bg-primary text-white hover:bg-accent transition-colors"
          >
            Send Message
          </button>
        </form>

        <div className="w-full hidden lg:block lg:w-1/3 mx-auto space-y-6 lg:border-l border-border lg:pl-6 text-paragraph">
          {[
            {
              icon: <MdMail size={32} className="text-white" />,
              title: "Email",
              value: "MianHamid6426@gmail.com",
            },
            {
              icon: <MdLocationPin size={32} className="text-white" />,
              title: "Address",
              value: "Nowshera, KPK, Pakistan",
            },
            {
              icon: <MdPhone size={32} className="text-white" />,
              title: "Phone",
              value: "+923349229907",
              link: "https://api.whatsapp.com/send?phone=923349229907",
            },
            {
              icon: <FaCalendarAlt size={28} className="text-white" />,
              title: "Book a Call",
              value: "Calendly.com/Hamid6426",
              link: "https://calendly.com/Hamid6426",
            },
          ].map(({ icon, title, value, link }, idx) => (
            <div key={idx} className="flex items-start">
              <div className="h-14 w-14 flex items-center justify-center rounded bg-primary shrink-0">
                {icon}
              </div>
              <div className="space-y-1 ml-4">
                <div className="text-xl font-bold text-primary">{title}</div>
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tracking-tight hover:underline leading-tight break-all"
                    style={{
                      animation:
                        "pulseGlowFrost 5s infinite cubic-bezier(0.4, 0, 0.6, 1)",
                      display: "inline-block",
                      willChange: "transform, color, text-shadow",
                    }}
                  >
                    {value}
                  </a>
                ) : (
                  <p className="break-words">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 w-full px-6 max-w-5xl mx-auto text-paragraph lg:hidden gap-6">
          {[
            {
              icon: <MdMail size={32} className="text-white" />,
              title: "Email",
              value: "MianHamid6426@gmail.com",
            },
            {
              icon: <MdLocationPin size={32} className="text-white" />,
              title: "Address",
              value: "Nowshera, KPK, Pakistan",
            },
            {
              icon: <MdPhone size={32} className="text-white" />,
              title: "Phone",
              value: "+923349229907",
              link: "https://api.whatsapp.com/send?phone=923349229907",
            },
            {
              icon: <FaCalendarAlt size={28} className="text-white" />,
              title: "Book a Call",
              value: "Calendly.com/Hamid6426",
              link: "https://calendly.com/Hamid6426",
            },
          ].map(({ icon, title, value, link }, idx) => (
            <div key={idx} className="flex items-start">
              <div className="h-14 w-14 flex items-center justify-center rounded bg-primary shrink-0">
                {icon}
              </div>
              <div className="space-y-1 ml-4">
                <div className="text-xl font-bold text-primary">{title}</div>
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="tracking-tight hover:underline leading-tight break-all"
                    style={{
                      animation:
                        "pulseGlowFrost 5s infinite cubic-bezier(0.4, 0, 0.6, 1)",
                      display: "inline-block",
                      willChange: "transform, color, text-shadow",
                    }}
                  >
                    {value}
                  </a>
                ) : (
                  <p className="break-words">{value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
