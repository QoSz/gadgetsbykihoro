import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - FoneXpress',
  description: 'Learn about FoneXpress, Kenya\'s trusted phone retailer with years of experience and exceptional service',
};

export default function AboutPage() {
  const values = [
    {
      title: 'Quality',
      description: 'We only offer authentic products and use genuine parts for repairs',
      gradient: 'from-yellow-400 to-orange-500',
      svg: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      title: 'Trust',
      description: 'Transparent pricing and honest service you can rely on',
      gradient: 'from-blue-500 to-cyan-500',
      svg: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Expertise',
      description: 'Certified technicians with years of experience',
      gradient: 'from-purple-500 to-indigo-600',
      svg: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: 'Customer First',
      description: 'Your satisfaction is our top priority',
      gradient: 'from-red-500 to-pink-600',
      svg: (
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '15,000+', label: 'Devices Sold' },
    { number: '8,000+', label: 'Repairs Completed' },
    { number: '5+', label: 'Years in Business' },
  ];

  const team = [
    { 
      name: 'John Kamau', 
      role: 'Founder & CEO', 
      initials: 'JK',
      gradient: 'from-blue-600 to-indigo-700',
    },
    { 
      name: 'Sarah Wanjiku', 
      role: 'Head of Operations', 
      initials: 'SW',
      gradient: 'from-purple-600 to-pink-600',
    },
    { 
      name: 'David Omondi', 
      role: 'Lead Technician', 
      initials: 'DO',
      gradient: 'from-green-600 to-teal-600',
    },
    { 
      name: 'Grace Akinyi', 
      role: 'Customer Relations', 
      initials: 'GA',
      gradient: 'from-orange-600 to-red-600',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#E31E24] to-[#B71C1C] text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">About FoneXpress</h1>
          <p className="text-lg text-red-100 max-w-3xl mx-auto">
            Kenya&apos;s trusted phone retailer, committed to keeping you connected with quality products and exceptional service
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-gray-600 text-base">
                <p>
                  Founded in 2019, FoneXpress began with a simple mission: to provide Kenyans with access to quality smartphones and reliable repair services at fair prices.
                </p>
                <p>
                  What started as a small shop in Nairobi has grown into one of Kenya&apos;s most trusted phone retailers, serving thousands of satisfied customers across the country.
                </p>
                <p>
                  We pride ourselves on our commitment to authenticity, transparency, and customer satisfaction. Every device we sell and every repair we perform meets our high standards of quality.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-[#E31E24]/10 via-gray-50 to-gray-100 rounded-2xl h-96 flex items-center justify-center relative overflow-hidden shadow-lg">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E31E24]/5 to-transparent"></div>
              <div className="relative">
                <div className="w-48 h-48 bg-gradient-to-br from-[#E31E24] to-[#B71C1C] rounded-3xl flex items-center justify-center shadow-2xl transform rotate-12 hover:rotate-0 transition-transform duration-300">
                  <svg className="w-28 h-28 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[#E31E24] mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg text-center hover:shadow-xl hover:-translate-y-2 transition-all group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-xl mx-auto mb-6 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  {value.svg}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {value.title}
                </h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Meet Our Team
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Dedicated professionals committed to your satisfaction
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 text-center hover:shadow-xl transition-all hover:-translate-y-2 group border border-gray-100"
              >
                <div className={`w-24 h-24 bg-gradient-to-br ${member.gradient} rounded-full mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                  <span className="text-3xl font-bold text-white">{member.initials}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-[#E31E24] to-[#B71C1C] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Ready to Experience the FoneXpress Difference?
          </h2>
          <p className="text-lg mb-8 text-red-100 max-w-2xl mx-auto">
            Visit our store or get in touch with us today
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#E31E24] rounded-full font-semibold hover:bg-gray-50 transition-all hover:scale-105"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}

