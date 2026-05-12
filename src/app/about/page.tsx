import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Gadgets By Kihoro',
  description: 'Learn about Gadgets By Kihoro, your trusted gadgets store with years of experience and exceptional service in Kenya',
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

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#f8f8f6] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a] mb-4">About Gadgets By Kihoro</h1>
          <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto">
            Kenya&apos;s trusted electronics retailer, committed to keeping you connected with quality products and exceptional service
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0a0a0a] mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-[#404040] text-base">
                <p>
                  Founded with a passion for technology and a commitment to customer satisfaction, Gadgets By Kihoro has been making cutting-edge technology accessible to everyone.
                </p>
                <p>
                  Based at Platinum Plaza, 3rd Floor, Shop No. 305, Nairobi, Gadgets By Kihoro has grown into one of Kenya&apos;s most trusted electronics retailers, serving thousands of satisfied customers across the country.
                </p>
                <p>
                  We pride ourselves on our commitment to authenticity, transparency, and customer satisfaction. Every device we sell and every repair we perform meets our high standards of quality.
                </p>
              </div>
            </div>
            <div className="bg-[#f8f8f6] rounded-2xl border border-gray-100 h-96 flex items-center justify-center">
              <div className="w-48 h-48 bg-[#0066ff] rounded-2xl flex items-center justify-center">
                  <svg className="w-28 h-28 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-[#0a0a0a] mb-2">
                  {stat.number}
                </p>
                <p className="text-[#6b6b6b] font-medium text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-[#f8f8f6]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0a0a0a] mb-4">
              Our Values
            </h2>
            <p className="text-lg text-[#6b6b6b] max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center hover:shadow-md hover:border-gray-200 transition-all duration-200"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${value.gradient} rounded-xl mx-auto mb-6 flex items-center justify-center shadow-md`}>
                  {value.svg}
                </div>
                <h3 className="text-lg font-bold text-[#0a0a0a] mb-3">
                  {value.title}
                </h3>
                <p className="text-[#404040]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-6">
            Ready to Experience Gadgets By Kihoro?
          </h2>
          <p className="text-lg mb-8 text-gray-400 max-w-2xl mx-auto">
            Visit our store or get in touch with us today
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-white text-[#0a0a0a] rounded-xl font-semibold hover:bg-gray-100 transition-colors duration-200"
          >
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
}

