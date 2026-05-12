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
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero — compact, dark with blue accent stripe */}
      <section className="relative bg-[#0a0a0a] py-10 md:py-12 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0066ff] via-[#0052cc] to-[#0066ff]" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDE4YzAtOS45NC04LjA2LTE4LTE4LTE4UzAgOC4wNiAwIDE4czguMDYgMTggMTggMTggMTgtOC4wNiAxOC0xOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-white mb-2">
            Get in Touch
          </h1>
          <p className="text-sm md:text-base text-gray-400 max-w-lg">
            Questions about a product, need support, or want to visit us? We&apos;re here to help.
          </p>
        </div>
      </section>

      {/* Contact Info Strip — tight horizontal bar */}
      <section className="border-b border-gray-200 bg-[#fafafa]">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            <a
              href="https://www.google.com/maps/place/Platinum+Plaza+-+CBD/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 py-3.5 pr-4 border-r border-gray-200 hover:bg-white transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-[#0066ff]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#0066ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#0a0a0a]">Visit Us</p>
                <p className="text-xs text-[#6b6b6b] truncate group-hover:text-[#0066ff] transition-colors">Platinum Plaza, 3rd Floor</p>
              </div>
            </a>

            <a
              href="tel:+254743816791"
              className="group flex items-center gap-3 py-3.5 px-4 lg:border-r border-gray-200 hover:bg-white transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-[#0066ff]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#0066ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#0a0a0a]">Call Us</p>
                <p className="text-xs text-[#6b6b6b] group-hover:text-[#0066ff] transition-colors">+254 743 816 791</p>
              </div>
            </a>

            <a
              href="mailto:info@gadgetsbykihoro.com"
              className="group flex items-center gap-3 py-3.5 px-4 border-r border-t lg:border-t-0 border-gray-200 hover:bg-white transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-[#0066ff]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#0066ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#0a0a0a]">Email Us</p>
                <p className="text-xs text-[#6b6b6b] truncate group-hover:text-[#0066ff] transition-colors">info@gadgetsbykihoro.com</p>
              </div>
            </a>

            <div className="flex items-center gap-3 py-3.5 px-4 border-t lg:border-t-0 border-gray-200">
              <div className="w-9 h-9 rounded-lg bg-[#0066ff]/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-[#0066ff]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-[#0a0a0a]">Hours</p>
                <p className="text-xs text-[#6b6b6b]">Mon–Sat: 9AM – 6PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content: Form (3 cols) + Sidebar (2 cols) */}
      <section className="py-8 md:py-10">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="rounded-xl border border-gray-200 p-5 md:p-6">
                <h2 className="text-lg font-bold text-[#0a0a0a] mb-1">Send Us a Message</h2>
                <p className="text-xs text-[#6b6b6b] mb-5">We&apos;ll get back to you within 24 hours.</p>

                {submitted && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded-lg text-sm font-medium flex items-center gap-2">
                    <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    Message sent successfully. We&apos;ll be in touch!
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-3.5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="name" className="block text-xs font-semibold text-[#424242] mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] outline-none transition-all text-gray-900 placeholder:text-gray-400"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-semibold text-[#424242] mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] outline-none transition-all text-gray-900 placeholder:text-gray-400"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label htmlFor="phone" className="block text-xs font-semibold text-[#424242] mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] outline-none transition-all text-gray-900 placeholder:text-gray-400"
                        placeholder="+254 743 816 791"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-xs font-semibold text-[#424242] mb-1.5">
                        Subject *
                      </label>
                      <select
                        id="subject"
                        name="subject"
                        required
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] outline-none transition-all text-gray-900"
                      >
                        <option value="">Select a subject</option>
                        <option value="sales">Sales Inquiry</option>
                        <option value="repair">Repair Service</option>
                        <option value="warranty">Warranty Claim</option>
                        <option value="support">Technical Support</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-xs font-semibold text-[#424242] mb-1.5">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#0066ff]/20 focus:border-[#0066ff] outline-none transition-all resize-none text-gray-900 placeholder:text-gray-400"
                      placeholder="Tell us how we can help you..."
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-2.5 bg-[#0066ff] text-white text-sm rounded-lg font-semibold hover:bg-[#0052cc] transition-all shadow-sm hover:shadow-md"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar: Map + Quick Contact */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              {/* Map */}
              <div className="aspect-square rounded-xl overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.274092337235!2d36.80510348715821!3d-1.2827029999999977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f117a4e4b470b%3A0xd2627a832ab1f665!2sPlatinum%20Plaza%20-%20CBD!5e0!3m2!1sen!2ske!4v1778615044550!5m2!1sen!2ske"
                  className="w-full h-full border-0"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Gadgets By Kihoro - Platinum Plaza location"
                />
              </div>

              {/* Quick Contact CTA */}
              <div className="rounded-xl bg-[#0a0a0a] p-5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#0066ff]/10 rounded-full -translate-y-8 translate-x-8" />
                <div className="absolute bottom-0 left-0 w-16 h-16 bg-[#0066ff]/5 rounded-full translate-y-6 -translate-x-6" />
                <div className="relative">
                  <h3 className="text-sm font-bold text-white mb-1">Need Immediate Help?</h3>
                  <p className="text-xs text-gray-400 mb-4">Reach us directly — we respond fast.</p>
                  <div className="space-y-2">
                    <a
                      href="tel:+254743816791"
                      className="flex items-center gap-3 w-full px-3.5 py-2.5 bg-white/10 text-white rounded-lg text-sm font-medium hover:bg-white/20 transition-colors"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                      </svg>
                      +254 743 816 791
                    </a>
                    <a
                      href="https://wa.me/254743816791"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 w-full px-3.5 py-2.5 bg-[#25d366] text-white rounded-lg text-sm font-semibold hover:bg-[#20bd5a] transition-colors"
                    >
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp Us
                    </a>
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
