'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getKCBEligibleProducts } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import FilterDrawer from '@/components/filters/FilterDrawer';
import FilterButton from '@/components/filters/FilterButton';
import type { FilterConfig } from '@/components/filters/FilterSection';

function KCBOffersContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isInitialized = useRef(false);

  const kcbProducts = getKCBEligibleProducts();

  // Initialize state from URL parameters
  const [selectedCategory, setSelectedCategory] = useState<string>(() => searchParams.get('category') || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>(() => searchParams.get('brand') || 'all');
  const [selectedPrice, setSelectedPrice] = useState<string>(() => searchParams.get('price') || 'all');
  const [sortBy, setSortBy] = useState<string>(() => searchParams.get('sort') || 'featured');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Get unique brands and categories
  const brands = ['all', ...Array.from(new Set(kcbProducts.map(p => p.brand)))].sort();
  const categories = ['all', ...Array.from(new Set(kcbProducts.map(p => p.category)))].sort();

  // Update URL when filters change (with debouncing)
  useEffect(() => {
    // Skip initial render to avoid duplicate navigation
    if (!isInitialized.current) {
      isInitialized.current = true;
      return;
    }

    // Debounce URL updates
    const timeoutId = setTimeout(() => {
      const params = new URLSearchParams();

      if (selectedCategory !== 'all') params.set('category', selectedCategory);
      if (selectedBrand !== 'all') params.set('brand', selectedBrand);
      if (selectedPrice !== 'all') params.set('price', selectedPrice);
      if (sortBy !== 'featured') params.set('sort', sortBy);

      const queryString = params.toString();
      const newUrl = queryString ? `/products/kcb-offers?${queryString}` : '/products/kcb-offers';

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, selectedBrand, selectedPrice, sortBy, router]);

  // Filter products
  let filteredProducts = kcbProducts.filter(product => {
    const brandMatch = selectedBrand === 'all' || product.brand.toLowerCase() === selectedBrand.toLowerCase();
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;

    let priceMatch = true;
    if (selectedPrice !== 'all') {
      const price = product.price;
      switch (selectedPrice) {
        case 'under-50k':
          priceMatch = price < 50000;
          break;
        case '50k-100k':
          priceMatch = price >= 50000 && price < 100000;
          break;
        case 'above-100k':
          priceMatch = price >= 100000;
          break;
      }
    }

    return brandMatch && categoryMatch && priceMatch;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'newest':
        return b.id.localeCompare(a.id);
      default:
        return 0;
    }
  });

  // Calculate active filters count
  const activeFiltersCount = [
    selectedBrand !== 'all',
    selectedCategory !== 'all',
    selectedPrice !== 'all',
    sortBy !== 'featured',
  ].filter(Boolean).length;

  // Clear all filters
  const handleClearAll = () => {
    setSelectedBrand('all');
    setSelectedCategory('all');
    setSelectedPrice('all');
    setSortBy('featured');
  };

  // Filter configuration
  const filterConfig: FilterConfig[] = [
    {
      title: 'Category',
      options: categories.map(cat => ({
        value: cat,
        label: cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1),
      })),
      selectedValue: selectedCategory,
      onValueChange: setSelectedCategory,
      type: 'radio',
      defaultExpanded: true,
    },
    {
      title: 'Brand',
      options: brands.map(brand => ({
        value: brand,
        label: brand === 'all' ? 'All Brands' : brand,
      })),
      selectedValue: selectedBrand,
      onValueChange: setSelectedBrand,
      type: 'radio',
      defaultExpanded: true,
    },
    {
      title: 'Price Range',
      options: [
        { value: 'all', label: 'All Prices' },
        { value: 'under-50k', label: 'Under KSh 50,000' },
        { value: '50k-100k', label: 'KSh 50,000 - 100,000' },
        { value: 'above-100k', label: 'Above KSh 100,000' },
      ],
      selectedValue: selectedPrice,
      onValueChange: setSelectedPrice,
      type: 'radio',
      defaultExpanded: true,
    },
    {
      title: 'Sort By',
      options: [
        { value: 'featured', label: 'Featured' },
        { value: 'newest', label: 'Newest First' },
        { value: 'price-low', label: 'Price: Low to High' },
        { value: 'price-high', label: 'Price: High to Low' },
        { value: 'name', label: 'Name: A to Z' },
      ],
      selectedValue: sortBy,
      onValueChange: setSortBy,
      type: 'select',
      defaultExpanded: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-[#f8f8f6] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-4">KCB Financing Available</p>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a] mb-4">Own Your Device Today</h1>
          <p className="text-lg text-[#6b6b6b] max-w-3xl mx-auto mb-4">
            Get your favorite devices with flexible monthly payments through KCB Bank
          </p>
          <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 text-green-700 px-6 py-2.5 rounded-xl">
            <span className="font-semibold text-sm">Pay as low as KSh 2,000/month</span>
          </div>
        </div>
      </section>

      {/* KCB Info Bar */}
      <section className="bg-white py-8 border-b border-gray-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-xs">KCB</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Quick Approval</p>
                <p className="text-xs text-gray-600">Same day processing</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">TERM</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Flexible Terms</p>
                <p className="text-xs text-gray-600">6 to 24 months</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">RATE</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Low Rates</p>
                <p className="text-xs text-gray-600">Competitive interest</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold text-center leading-tight">NO FEES</span>
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">No Hidden Fees</p>
                <p className="text-xs text-gray-600">Transparent pricing</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Drawer */}
      <FilterDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        filters={filterConfig}
        activeFiltersCount={activeFiltersCount}
        onClearAll={handleClearAll}
        resultCount={filteredProducts.length}
      />

      {/* Filter Button */}
      <FilterButton
        onClick={() => setIsDrawerOpen(true)}
        activeFiltersCount={activeFiltersCount}
      />

      {/* Products Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your filters to see more products</p>
              <button
                onClick={handleClearAll}
                className="inline-flex items-center justify-center px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-all"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              How KCB Financing Works
            </h2>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Get your device in 3 simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Choose Your Device
              </h3>
              <p className="text-gray-600">
                Browse our KCB-eligible products and select the device you want
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Apply for Financing
              </h3>
              <p className="text-gray-600">
                Contact us to complete your KCB financing application
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">3</span>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Get Your Device
              </h3>
              <p className="text-gray-600">
                Once approved, collect your device and start enjoying it!
              </p>
            </div>
          </div>
          <div className="text-center mt-12">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-green-600 text-white rounded-lg font-bold text-base hover:bg-green-700 transition-all shadow-lg"
            >
              Apply for KCB Financing
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function KCBOffersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <section className="bg-[#f8f8f6] py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold text-green-700 uppercase tracking-wider mb-4">KCB Financing Available</p>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a] mb-4">Own Your Device Today</h1>
            <p className="text-lg text-[#6b6b6b] max-w-3xl mx-auto">
              Get your favorite devices with flexible monthly payments through KCB Bank
            </p>
          </div>
        </section>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      </div>
    }>
      <KCBOffersContent />
    </Suspense>
  );
}
