'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to your backend
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: '📍',
      title: 'Visit Us',
      details: ['Platinum Plaza, 3rd Floor, Shop No. 305', 'Nairobi, Kenya'],
    },
    {
      icon: '📞',
      title: 'Call Us',
      details: ['+254 743 816 791'],
    },
    {
      icon: '📧',
      title: 'Email Us',
      details: ['info@gadgetsbykihoro.com'],
    },
    {
      icon: '🕐',
      title: 'Business Hours',
      details: ['Mon - Sat: 9:00 AM - 6:00 PM', 'Sunday: Closed'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-linear-to-r from-[#007aff] to-[#0056b3] text-white py-12 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">Contact Us</h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Get in touch with Gadgets By Kihoro for any questions, support, or inquiries
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 md:p-8 shadow-lg text-center"
              >
                <div className="text-4xl mb-3">{info.icon}</div>
                <h3 className="text-base font-bold text-gray-900 mb-2">
                  {info.title}
                </h3>
                {info.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-600 text-sm">
                    {detail}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
              <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">
                Send Us a Message
              </h2>
              
              {submitted && (
                <div className="mb-4 md:mb-6 p-3 md:p-4 bg-green-100 text-green-700 rounded-lg">
                  Thank you! Your message has been sent successfully.
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007aff] focus:border-transparent text-gray-900 placeholder:text-gray-300"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007aff] focus:border-transparent text-gray-900 placeholder:text-gray-300"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007aff] focus:border-transparent text-gray-900 placeholder:text-gray-300"
                    placeholder="+254 743 816 791"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007aff] focus:border-transparent text-gray-900"
                  >
                    <option value="">Select a subject</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="repair">Repair Service</option>
                    <option value="warranty">Warranty Claim</option>
                    <option value="support">Technical Support</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm md:text-base font-semibold text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#007aff] focus:border-transparent resize-none text-gray-900 placeholder:text-gray-300"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-3 md:py-4 bg-[#007aff] text-white rounded-full font-semibold hover:bg-[#0056b3] transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-6 md:space-y-8">
              {/* Map Placeholder */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Find Us
                </h3>
                <div className="bg-linear-to-br from-blue-100 to-gray-100 rounded-lg h-48 md:h-64 flex items-center justify-center text-6xl">
                  🗺️
                </div>
                <p className="mt-4 text-gray-600">
                  Located in the heart of Nairobi, easily accessible by public transport
                </p>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">
                  Quick Questions?
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Do you offer same-day repairs?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Yes, for most common repairs like screen replacements.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Can I trade in my old phone?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Absolutely! We offer competitive trade-in values.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Do you deliver?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Yes, we offer delivery within Nairobi and surrounding areas.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

