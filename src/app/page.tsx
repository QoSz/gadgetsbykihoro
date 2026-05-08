import Link from 'next/link';
import HeroCarousel from '@/components/HeroCarousel';

export default function Home() {
  const priceRanges = [
    { label: 'Under KSh 20,000', range: '< 20k', color: 'from-green-500 to-emerald-600', href: '/products?price=under-20k' },
    { label: 'KSh 20,000 - 50,000', range: '20k-50k', color: 'from-blue-500 to-cyan-600', href: '/products?price=20k-50k' },
    { label: 'KSh 50,000 - 100,000', range: '50k-100k', color: 'from-purple-500 to-pink-600', href: '/products?price=50k-100k' },
    { label: 'Above KSh 100,000', range: '> 100k', color: 'from-orange-500 to-red-600', href: '/products?price=above-100k' },
  ];

  const featuredProducts = [
    {
      name: 'Samsung Galaxy A05',
      brand: 'Samsung',
      price: 'KSh 10,699',
      originalPrice: 'KSh 10,999',
      specs: '4GB RAM • 64GB Storage • 50MP Camera',
      badge: '25th Anniversary Sale',
    },
    {
      name: 'HMD Arc',
      brand: 'HMD',
      price: 'KSh 9,999',
      originalPrice: 'KSh 10,499',
      specs: '4GB RAM • 64GB Storage • 5000mAh',
      badge: 'Special Offer',
    },
    {
      name: 'Samsung Galaxy Tab S9',
      brand: 'Samsung',
      price: 'KSh 67,999',
      originalPrice: 'KSh 91,999',
      specs: '8GB RAM • 128GB Storage • 11" Display',
      badge: '26% Off',
    },
    {
      name: 'Nokia C12 Pro',
      brand: 'HMD',
      price: 'KSh 9,599',
      originalPrice: 'KSh 9,999',
      specs: '4GB RAM • 64GB Storage • IP52 Water Resistant',
      badge: 'Limited Stock',
    },
  ];

  const topBrands = [
    { name: 'Samsung', description: 'Galaxy Series', colors: { from: '#1428A0', to: '#034EA2' } },
    { name: 'Apple', description: 'iPhone & iPad', colors: { from: '#555555', to: '#000000' } },
    { name: 'HMD', description: 'Nokia Phones', colors: { from: '#124191', to: '#005AFF' } },
    { name: 'Tecno', description: 'Latest Models', colors: { from: '#00A3E0', to: '#0077BE' } },
    { name: 'Infinix', description: 'Hot Series', colors: { from: '#000000', to: '#333333' } },
    { name: 'Xiaomi', description: 'Redmi & Mi', colors: { from: '#FF6700', to: '#FA5C00' } },
  ];

  const categories = [
    { name: 'Smartphones', count: '500+' },
    { name: 'Tablets', count: '100+' },
    { name: 'Accessories', count: '1000+' },
    { name: 'Laptops', count: '150+' },
    { name: 'Wearables', count: '80+' },
    { name: 'Audio', count: '200+' },
  ];

  return (
    <div className="overflow-hidden">
      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-[#E31E24] to-[#B71C1C] text-white py-3">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs md:text-sm font-semibold">
            <span className="inline-block bg-white/20 px-2 py-0.5 rounded text-xs mr-2">NEW</span>
            25th Anniversary Sale - Up to 26% OFF on Selected Items
          </p>
        </div>
      </div>

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Shop by Price Range */}
      <section className="py-20 bg-white -mt-2">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Shop by Budget
            </h2>
            <p className="text-base text-gray-600">
              Find the perfect phone within your price range
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {priceRanges.map((range, index) => (
              <Link
                key={index}
                href={range.href}
                className="group"
              >
                <div className={`relative bg-gradient-to-br ${range.color} rounded-2xl p-8 text-white overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-2`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                  <div className="relative">
                    <p className="text-xs font-semibold mb-2 opacity-90">{range.label}</p>
                    <p className="text-3xl font-bold">{range.range}</p>
                    <p className="mt-4 text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                      Browse phones →
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full mb-4">
              <div className="w-2 h-2 bg-red-600 rounded-full animate-pulse"></div>
              <span className="font-bold text-sm">25th Anniversary Special</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
              Hot Deals This Week
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Limited-time offers on our best-selling smartphones and tablets
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 flex flex-col h-full"
              >
                {/* Product Image */}
                <div className="relative flex-shrink-0">
                  <div className="bg-gray-100 h-56 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gray-200 rounded-2xl flex items-center justify-center shadow-sm">
                      <div className="w-24 h-24 bg-white rounded-xl shadow-inner"></div>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-[#E31E24] text-white px-3 py-1 rounded-md text-xs font-bold shadow-lg">
                    {product.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-[10px] font-semibold text-[#E31E24] mb-1 uppercase">{product.brand}</p>
                  <h3 className="text-base font-bold text-gray-900 mb-2 group-hover:text-[#E31E24] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-gray-600 mb-3">{product.specs}</p>

                  <div className="flex items-baseline gap-2 mb-4">
                    <p className="text-xl font-bold text-[#E31E24]">
                      {product.price}
                    </p>
                    <p className="text-sm text-gray-400 line-through">
                      {product.originalPrice}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <Link
                      href="/products"
                      className="text-center px-4 py-2 bg-[#E31E24] text-white rounded-lg font-semibold text-sm hover:bg-[#B71C1C] transition-colors"
                    >
                      Buy Now
                    </Link>
                    <a
                      href="https://wa.me/254788740000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center px-4 py-2 bg-green-500 text-white rounded-lg font-semibold text-sm hover:bg-green-600 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-8 py-4 bg-[#E31E24] text-white rounded-lg font-bold text-base hover:bg-[#B71C1C] transition-colors shadow-lg hover:shadow-xl"
            >
              View All Products
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Shop by Brand */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Shop by Brand
            </h2>
            <p className="text-base text-gray-600">
              Explore our wide selection from top manufacturers
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {topBrands.map((brand, index) => (
              <Link
                key={index}
                href={`/products?brand=${brand.name.toLowerCase()}`}
                className="group"
              >
                <div
                  className="relative rounded-xl p-8 text-center overflow-hidden transition shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transform-gpu will-change-transform"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${brand.colors.from} 0%, ${brand.colors.to} 100%)`
                  }}
                >
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition-all"></div>
                  <div className="relative">
                    <h3 className="font-bold text-xl mb-2 text-white transition-all">{brand.name}</h3>
                    <p className="text-xs text-white/80 group-hover:text-white transition-all">{brand.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Explore Our Categories
            </h2>
            <p className="text-base text-gray-600">
              Everything you need in one place
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {categories.map((category, index) => (
              <Link
                key={index}
                href="/products"
                className="group"
              >
                <div className="relative bg-white/60 backdrop-blur-md rounded-xl p-6 text-center transition-all border border-gray-200 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-[#E31E24]/30 overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E31E24]/20 to-[#B71C1C]/20 group-hover:h-1 group-hover:from-[#E31E24] group-hover:to-[#B71C1C] transition-all"></div>
                  <div className="pt-2">
                    <h3 className="font-bold text-base text-gray-900 mb-2 group-hover:text-[#E31E24] transition-colors">{category.name}</h3>
                    <p className="text-sm text-gray-600">{category.count} items</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* KCB Financing Section */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12 border-l-4 border-green-600">
                <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full mb-6">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="font-bold text-sm">Flexible Payment Options</span>
                </div>
                <h2 className="text-2xl md:text-4xl font-bold mb-6 text-gray-900">
                  KCB Financing Available
                </h2>
                <p className="text-lg mb-8 text-gray-600">
                  Get your dream phone today and pay later with convenient installment plans through KCB Bank
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-green-600"></div>
                    </div>
                    <span className="text-base text-gray-700">Easy approval process</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-green-600"></div>
                    </div>
                    <span className="text-base text-gray-700">Flexible payment terms</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                      <div className="w-2 h-2 rounded-full bg-green-600"></div>
                    </div>
                    <span className="text-base text-gray-700">Low interest rates</span>
                  </li>
                </ul>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-lg font-bold text-base hover:bg-green-700 transition-all shadow-md hover:shadow-lg"
                >
                  Learn More
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12 flex flex-col justify-center">
                <div className="w-20 h-20 bg-green-600 rounded-xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                  <div className="text-3xl font-bold text-white">KCB</div>
                </div>
                <h3 className="text-xl font-bold text-center mb-4 text-gray-900">
                  Calculate Your Monthly Payment
                </h3>
                <p className="text-center text-gray-600 mb-6">
                  Own the latest smartphone for as low as KSh 2,000/month
                </p>
                <div className="text-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg font-semibold hover:bg-gray-800 transition-all shadow-md"
                  >
                    Contact Us for Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Repair Services Section */}
      <section className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full mb-6">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
              </svg>
              <span className="font-bold text-sm">Professional Repair Services</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Expert Phone Repair at Your Service
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              25+ years of experience fixing phones. Same-day service available for most repairs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                title: 'Screen Repair',
                description: 'Professional screen replacement with original quality parts',
                price: 'From KSh 2,500',
                color: 'from-blue-500 to-blue-600',
                bgColor: 'from-blue-50 to-blue-100/50',
                iconColor: 'text-blue-600',
                svg: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/>
                  </svg>
                ),
              },
              {
                title: 'Battery Replacement',
                description: 'Restore your battery life with certified replacements',
                price: 'From KSh 2,000',
                color: 'from-green-500 to-green-600',
                bgColor: 'from-green-50 to-green-100/50',
                iconColor: 'text-green-600',
                svg: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
                  </svg>
                ),
              },
              {
                title: 'Water Damage',
                description: 'Specialized treatment for water-damaged devices',
                price: 'From KSh 3,500',
                color: 'from-cyan-500 to-blue-600',
                bgColor: 'from-cyan-50 to-blue-100/50',
                iconColor: 'text-cyan-600',
                svg: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                  </svg>
                ),
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              >
                {/* Background Pattern */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.bgColor} opacity-50`}></div>
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-white/40 to-transparent rounded-full -mr-20 -mt-20 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-white/40 to-transparent rounded-full -ml-16 -mb-16 group-hover:scale-150 transition-transform duration-700"></div>
                
                <div className="relative p-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${service.color} rounded-2xl flex items-center justify-center mb-6 transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg ${service.iconColor}`}>
                    <div className="text-white">
                      {service.svg}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-[#E31E24] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-bold text-[#E31E24]">{service.price}</span>
                    <span className="text-xs text-gray-500 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-gray-200">90-day warranty</span>
                  </div>
                  <a
                    href="https://wa.me/254788740000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-3 bg-[#E31E24] text-white rounded-xl font-semibold text-sm hover:bg-[#B71C1C] transition-all shadow-md hover:shadow-lg"
                  >
                    Book Repair
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center justify-center px-8 py-4 bg-gray-900 text-white rounded-lg font-bold text-base hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
            >
              View All Repair Services
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#E31E24] via-[#B71C1C] to-[#424242] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">
            Ready to Upgrade Your Phone?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-red-100 max-w-3xl mx-auto">
            Visit any of our branches or contact us today to find your perfect device
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#E31E24] rounded-lg font-bold text-base hover:bg-[#424242] hover:text-white transition-all shadow-xl"
            >
              Find a Branch
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </Link>
            <a
              href="tel:+254788740000"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-bold text-base hover:bg-white/10 transition-all"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              +254 788 740 000
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <p className="text-sm font-semibold mb-1">Call Us</p>
              <p className="text-base">+254 788 740 000</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <p className="text-sm font-semibold mb-1">Email Us</p>
              <p className="text-base">sales@fonexpress.net</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <p className="text-sm font-semibold mb-1">Location</p>
              <p className="text-base">Westlands, Nairobi</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
