import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Services - Gadgets By Kihoro',
  description: 'Expert repair services and comprehensive warranty coverage at Gadgets By Kihoro Kenya',
};

export default function ServicesPage() {
  const services = [
    {
      title: 'Screen Repair',
      description: 'Professional screen replacement for all phone models with high-quality parts',
      features: ['Same-day service', 'Original quality screens', '90-day warranty'],
      color: 'from-blue-500 to-blue-700',
      bgColor: 'from-blue-50 to-blue-100/50',
      price: 'From KSh 2,500',
      turnaround: '30-60 mins',
      svg: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
        </svg>
      ),
    },
    {
      title: 'Battery Replacement',
      description: 'Restore your phone\'s battery life with genuine replacement batteries',
      features: ['Certified batteries', 'Quick turnaround', '1-year warranty'],
      color: 'from-green-500 to-green-700',
      bgColor: 'from-green-50 to-green-100/50',
      price: 'From KSh 2,000',
      turnaround: '45 mins',
      svg: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
        </svg>
      ),
    },
    {
      title: 'Water Damage Repair',
      description: 'Specialized treatment for water-damaged devices',
      features: ['Deep cleaning', 'Component testing', 'Data recovery'],
      color: 'from-cyan-500 to-blue-600',
      bgColor: 'from-cyan-50 to-blue-100/50',
      price: 'From KSh 3,500',
      turnaround: '2-4 hours',
      svg: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
        </svg>
      ),
    },
    {
      title: 'Software Issues',
      description: 'Fix software problems, virus removal, and system optimization',
      features: ['OS updates', 'Virus removal', 'Performance boost'],
      color: 'from-purple-500 to-purple-700',
      bgColor: 'from-purple-50 to-purple-100/50',
      price: 'From KSh 1,500',
      turnaround: '1-2 hours',
      svg: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
        </svg>
      ),
    },
    {
      title: 'Charging Port Repair',
      description: 'Fix charging issues and loose port connections',
      features: ['Quality parts', 'Tested thoroughly', '60-day warranty'],
      color: 'from-yellow-500 to-orange-600',
      bgColor: 'from-yellow-50 to-orange-100/50',
      price: 'From KSh 1,800',
      turnaround: '1 hour',
      svg: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      ),
    },
    {
      title: 'Camera Repair',
      description: 'Restore camera functionality with genuine replacement parts',
      features: ['OEM quality', 'Full testing', '90-day warranty'],
      color: 'from-pink-500 to-rose-600',
      bgColor: 'from-pink-50 to-rose-100/50',
      price: 'From KSh 2,800',
      turnaround: '1-2 hours',
      svg: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
        </svg>
      ),
    },
  ];

  const warrantyPlans = [
    {
      name: 'Basic',
      duration: '6 Months',
      price: 'KSh 2,999',
      features: ['Hardware defects', 'Free diagnostics', 'Priority support'],
    },
    {
      name: 'Standard',
      duration: '12 Months',
      price: 'KSh 4,999',
      features: ['Hardware defects', 'Accidental damage', 'Free diagnostics', 'Priority support', 'One free screen repair'],
      popular: true,
    },
    {
      name: 'Premium',
      duration: '24 Months',
      price: 'KSh 8,999',
      features: ['Hardware defects', 'Accidental damage', 'Water damage', 'Free diagnostics', 'Priority support', 'Two free screen repairs', 'Battery replacement'],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#007aff] to-[#0056b3] text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-6">Our Services</h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Expert repair services and comprehensive warranty plans to keep your device running perfectly
          </p>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="py-12 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="text-white">
              <p className="text-3xl md:text-4xl font-bold mb-2">25+</p>
              <p className="text-sm text-gray-300">Years Experience</p>
            </div>
            <div className="text-white">
              <p className="text-3xl md:text-4xl font-bold mb-2">50K+</p>
              <p className="text-sm text-gray-300">Repairs Completed</p>
            </div>
            <div className="text-white">
              <p className="text-3xl md:text-4xl font-bold mb-2">98%</p>
              <p className="text-sm text-gray-300">Success Rate</p>
            </div>
            <div className="text-white">
              <p className="text-3xl md:text-4xl font-bold mb-2">4.9★</p>
              <p className="text-sm text-gray-300">Customer Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Repair Services */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#007aff]/10 text-[#007aff] px-4 py-2 rounded-full mb-6">
              <div className="w-2 h-2 bg-[#007aff] rounded-full animate-pulse"></div>
              <span className="font-bold text-sm">Expert Technicians Available</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional Repair Services
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Fast, reliable repairs by certified technicians using genuine parts. All repairs come with warranty coverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                {/* Background Pattern */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-50`}></div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/40 to-transparent rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/40 to-transparent rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-700"></div>

                {/* Gradient Header */}
                <div className={`relative bg-gradient-to-br ${service.color} p-8 overflow-hidden`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full -ml-12 -mb-12"></div>
                  <div className="relative">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                      <div className="text-white">
                        {service.svg}
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">
                      {service.title}
                    </h3>
                    <div className="flex items-center gap-4 text-white/90 text-sm">
                      <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"/>
                        </svg>
                        <span>{service.turnaround}</span>
                      </div>
                      <div className="w-1 h-1 bg-white/50 rounded-full"></div>
                      <span className="font-semibold">{service.price}</span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="relative p-8 bg-white">
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  {/* Features */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-gray-700">
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-0.5">
                          <svg
                            className="w-3.5 h-3.5 text-green-600"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Buttons */}
                  <div className="flex gap-3">
                    <a
                      href="https://wa.me/254743816791"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 text-center px-4 py-3 bg-[#007aff] text-white rounded-xl font-semibold text-sm hover:bg-[#0056b3] transition-all shadow-md hover:shadow-lg group-hover:scale-[1.02]"
                    >
                      Book Now
                    </a>
                    <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold text-sm hover:bg-gray-200 transition-all">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Warranty Badge */}
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-lg z-10">
                  <p className="text-xs font-bold text-gray-900">✓ Warranty</p>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Service Banner */}
          <div className="mt-16 bg-gradient-to-br from-[#007aff] via-[#0056b3] to-[#424242] rounded-3xl p-8 md:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                backgroundSize: '40px 40px'
              }}></div>
            </div>
            <div className="relative grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd"/>
                  </svg>
                  <span className="font-bold text-sm">Emergency Service</span>
                </div>
                <h3 className="text-3xl font-bold mb-4">
                  Need Urgent Repair?
                </h3>
                <p className="text-blue-100 mb-6 text-lg">
                  Walk in to any of our service centers for immediate assistance. Most repairs completed the same day!
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="tel:+254743816791"
                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#007aff] rounded-xl font-bold hover:bg-gray-100 transition-all shadow-lg"
                  >
                    <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/254743816791"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600 transition-all shadow-lg"
                  >
                    <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                    WhatsApp Us
                  </a>
                </div>
              </div>
              <div className="hidden md:flex justify-center items-center">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto mb-4 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    </svg>
                  </div>
                  <p className="text-2xl font-bold">Same-Day Service</p>
                  <p className="text-blue-100">Available for Most Repairs</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warranty Plans */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Warranty Plans
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Protect your investment with our comprehensive warranty coverage
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {warrantyPlans.map((plan, index) => (
              <div
                key={index}
                className={`rounded-2xl p-8 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-[#007aff] to-[#0056b3] text-white shadow-2xl scale-105'
                    : 'bg-gray-50 text-gray-900'
                }`}
              >
                {plan.popular && (
                  <div className="inline-block px-4 py-1 bg-yellow-400 text-gray-900 rounded-full text-sm font-semibold mb-4">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <p className={`text-base mb-4 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.duration}
                </p>
                <p className="text-3xl font-bold mb-6">{plan.price}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <svg
                        className={`w-5 h-5 mr-2 ${
                          plan.popular ? 'text-yellow-300' : 'text-green-500'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-3 rounded-full font-semibold transition-colors ${
                    plan.popular
                      ? 'bg-white text-[#007aff] hover:bg-gray-50'
                      : 'bg-[#007aff] text-white hover:bg-[#0056b3]'
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Our Repair Process
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Simple, Transparent, and Efficient
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                step: '1',
                title: 'Diagnosis',
                desc: 'Free assessment of your device',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"/>
                  </svg>
                )
              },
              {
                step: '2',
                title: 'Quote',
                desc: 'Transparent pricing with no hidden fees',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                )
              },
              {
                step: '3',
                title: 'Repair',
                desc: 'Expert technicians fix your device',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                )
              },
              {
                step: '4',
                title: 'Quality Check',
                desc: 'Thorough testing before return',
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                )
              },
            ].map((item, index) => (
              <div key={index} className="group">
                {/* Card Container */}
                <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full flex flex-col items-center text-center">
                  {/* Step Number with Gradient */}
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#007aff] to-[#0056b3] text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg group-hover:scale-110 transition-transform duration-300 relative z-10">
                      {item.step}
                    </div>
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 bg-[#007aff]/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Icon */}
                  <div className="mb-4 text-gray-700 group-hover:text-[#007aff] transition-colors duration-300 group-hover:scale-110 transform transition-transform">
                    {item.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

