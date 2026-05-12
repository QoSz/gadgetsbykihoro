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
      <div className="bg-[#0a0a0a] text-white py-2.5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-medium tracking-wide">
            25th Anniversary Sale — Up to 26% OFF on Selected Items
          </p>
        </div>
      </div>

      {/* Hero Carousel */}
      <HeroCarousel />

      {/* Shop by Price Range */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a] mb-4">
              Shop by Budget
            </h2>
            <p className="text-[#6b6b6b] text-lg">
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
                <div className={`bg-gradient-to-br ${range.color} rounded-xl p-6 text-white hover:shadow-md transition-all duration-200`}>
                  <p className="text-xs font-semibold mb-2 opacity-90">{range.label}</p>
                  <p className="text-2xl font-bold">{range.range}</p>
                  <p className="mt-3 text-sm opacity-90 group-hover:opacity-100 transition-opacity">
                    Browse phones →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-24 bg-[#f8f8f6]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a] mb-4">
              Hot Deals This Week
            </h2>
            <p className="text-[#6b6b6b] text-lg max-w-2xl mx-auto">
              Limited-time offers on our best-selling smartphones and tablets
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200 flex flex-col h-full"
              >
                {/* Product Image */}
                <div className="relative flex-shrink-0">
                  <div className="bg-gray-50 h-52 flex items-center justify-center">
                    <div className="w-32 h-32 bg-gray-200 rounded-2xl flex items-center justify-center shadow-sm">
                      <div className="w-24 h-24 bg-white rounded-xl shadow-inner"></div>
                    </div>
                  </div>
                  <div className="absolute top-3 left-3 bg-[#0066ff]/10 text-[#0066ff] px-3 py-1 rounded-md text-xs font-bold">
                    {product.badge}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-grow">
                  <p className="text-[#0066ff] text-xs font-semibold uppercase tracking-wider mb-1">{product.brand}</p>
                  <h3 className="text-base font-bold text-[#0a0a0a] mb-2 group-hover:text-[#0066ff] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-[10px] text-[#404040] mb-3">{product.specs}</p>

                  <div className="flex items-baseline gap-2 mb-4">
                    <p className="text-[#0066ff] font-bold text-lg">
                      {product.price}
                    </p>
                    <p className="text-sm text-gray-400 line-through">
                      {product.originalPrice}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-auto">
                    <Link
                      href="/products"
                      className="text-center px-4 py-2 bg-[#0066ff] text-white rounded-xl font-semibold text-sm hover:bg-[#0052cc] transition-colors duration-200"
                    >
                      Buy Now
                    </Link>
                    <a
                      href="https://wa.me/254743816791"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center px-4 py-2 bg-[#25d366] text-white rounded-xl font-semibold text-sm hover:bg-[#20bd5a] transition-colors duration-200"
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
              className="inline-flex items-center justify-center px-6 py-3 bg-[#0066ff] text-white rounded-xl font-semibold hover:bg-[#0052cc] transition-colors duration-200"
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
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a] mb-4">
              Shop by Brand
            </h2>
            <p className="text-[#6b6b6b] text-lg">
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
                  className="rounded-xl p-8 text-center hover:shadow-md transition-all duration-200"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${brand.colors.from} 0%, ${brand.colors.to} 100%)`
                  }}
                >
                  <h3 className="font-bold text-xl mb-2 text-white">{brand.name}</h3>
                  <p className="text-xs text-white/80">{brand.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a] mb-4">
              Explore Our Categories
            </h2>
            <p className="text-[#6b6b6b] text-lg">
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
                <div className="bg-[#f8f8f6] rounded-xl p-6 text-center border border-gray-100 hover:shadow-sm hover:border-gray-200 transition-all duration-200">
                  <h3 className="font-bold text-base text-[#0a0a0a] mb-2 group-hover:text-[#0066ff] transition-colors">{category.name}</h3>
                  <p className="text-sm text-[#6b6b6b]">{category.count} items</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* KCB Financing Section */}
      <section className="py-24 bg-[#f8f8f6]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="p-8 lg:p-12">
                <p className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-6">KCB Financing</p>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a] mb-6">
                  KCB Financing Available
                </h2>
                <p className="text-[#404040] text-lg mb-8">
                  Get your dream phone today and pay later with convenient installment plans through KCB Bank
                </p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-[#404040]">Easy approval process</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-[#404040]">Flexible payment terms</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                    </svg>
                    <span className="text-[#404040]">Low interest rates</span>
                  </li>
                </ul>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors duration-200"
                >
                  Learn More
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              </div>
              <div className="bg-[#f8f8f6] p-8 lg:p-12 flex flex-col justify-center">
                <div className="w-20 h-20 bg-green-600 rounded-xl mx-auto mb-6 flex items-center justify-center">
                  <div className="text-3xl font-bold text-white">KCB</div>
                </div>
                <h3 className="text-xl font-bold text-center mb-4 text-[#0a0a0a]">
                  Calculate Your Monthly Payment
                </h3>
                <p className="text-center text-[#6b6b6b] mb-6">
                  Own the latest smartphone for as low as KSh 2,000/month
                </p>
                <div className="text-center">
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-6 py-3 bg-[#0a0a0a] text-white rounded-xl font-semibold hover:bg-[#1a1a1a] transition-colors duration-200"
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
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a] mb-4">
              Expert Phone Repair at Your Service
            </h2>
            <p className="text-[#6b6b6b] text-lg max-w-2xl mx-auto">
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
                svg: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/>
                  </svg>
                ),
              },
            ].map((service, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all duration-200"
              >
                <div className="p-8">
                  <div className={`w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-6`}>
                    <div className="text-white">
                      {service.svg}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-[#0a0a0a] mb-3 group-hover:text-[#0066ff] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-[#404040] mb-4 text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-lg font-bold text-[#0066ff]">{service.price}</span>
                    <span className="text-xs text-[#6b6b6b] px-3 py-1 rounded-full border border-gray-100">90-day warranty</span>
                  </div>
                  <a
                    href="https://wa.me/254743816791"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center px-4 py-3 bg-[#0066ff] text-white rounded-xl font-semibold text-sm hover:bg-[#0052cc] transition-colors duration-200"
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
              className="inline-flex items-center justify-center px-6 py-3 bg-[#0a0a0a] text-white rounded-xl font-semibold hover:bg-[#1a1a1a] transition-colors duration-200"
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
      <section className="py-24 bg-[#0a0a0a] text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Ready to Upgrade Your Phone?
          </h2>
          <p className="text-lg md:text-xl mb-10 text-white/70 max-w-3xl mx-auto">
            Visit any of our branches or contact us today to find your perfect device
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#0a0a0a] rounded-xl font-semibold hover:bg-[#0066ff] hover:text-white transition-colors duration-200"
            >
              Find a Branch
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </Link>
            <a
              href="tel:+254743816791"
              className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-white/20 text-white rounded-xl font-semibold hover:bg-white/5 transition-colors duration-200"
            >
              <svg className="mr-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
              </svg>
              +254 743 816 791
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="text-sm font-semibold mb-1">Call Us</p>
              <p className="text-base text-white/70">+254 743 816 791</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="text-sm font-semibold mb-1">Email Us</p>
              <p className="text-base text-white/70">info@gadgetsbykihoro.com</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <p className="text-sm font-semibold mb-1">Location</p>
              <p className="text-base text-white/70">Platinum Plaza, 3rd Floor, Shop 305, Nairobi</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
