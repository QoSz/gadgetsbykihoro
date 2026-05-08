'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { allProducts, getBrands } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import FilterDrawer from '@/components/filters/FilterDrawer';
import FilterButton from '@/components/filters/FilterButton';
import type { FilterConfig } from '@/components/filters/FilterSection';

function ProductsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isInitialized = useRef(false);

  // Initialize state from URL parameters
  const [selectedBrand, setSelectedBrand] = useState<string>(() => searchParams.get('brand') || 'all');
  const [selectedCategory, setSelectedCategory] = useState<string>(() => searchParams.get('category') || 'all');
  const [selectedPrice, setSelectedPrice] = useState<string>(() => searchParams.get('price') || 'all');
  const [sortBy, setSortBy] = useState<string>(() => searchParams.get('sort') || 'featured');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const brands = ['all', ...getBrands()];

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

      if (selectedBrand !== 'all') params.set('brand', selectedBrand);
      if (selectedCategory !== 'all') params.set('category', selectedCategory);
      if (selectedPrice !== 'all') params.set('price', selectedPrice);
      if (sortBy !== 'featured') params.set('sort', sortBy);

      const queryString = params.toString();
      const newUrl = queryString ? `/products?${queryString}` : '/products';

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedBrand, selectedCategory, selectedPrice, sortBy, router]);

  // Filter products
  let filteredProducts = allProducts.filter(product => {
    const brandMatch = selectedBrand === 'all' || product.brand.toLowerCase() === selectedBrand.toLowerCase();
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    
    let priceMatch = true;
    if (selectedPrice !== 'all') {
      const price = product.price;
      switch (selectedPrice) {
        case 'under-20k':
          priceMatch = price < 20000;
          break;
        case '20k-50k':
          priceMatch = price >= 20000 && price < 50000;
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
      options: [
        { value: 'all', label: 'All Categories' },
        { value: 'smartphone', label: 'Smartphones' },
        { value: 'tablet', label: 'Tablets' },
        { value: 'television', label: 'Televisions' },
        { value: 'accessory', label: 'Accessories' },
      ],
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
        { value: 'under-20k', label: 'Under KSh 20,000' },
        { value: '20k-50k', label: 'KSh 20,000 - 50,000' },
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#E31E24] to-[#B71C1C] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">All Products</h1>
          <p className="text-lg text-red-100 max-w-3xl mx-auto mb-6">
            Browse our complete collection of smartphones, tablets, TVs, and accessories
          </p>
          {/* Quick Links to Categories */}
          <div className="flex flex-wrap gap-3 justify-center">
            <Link href="/products/phones-tablets" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-semibold transition-all">
              Phones & Tablets
            </Link>
            <Link href="/products/televisions" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-semibold transition-all">
              Televisions
            </Link>
            <Link href="/products/accessories" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-semibold transition-all">
              Accessories
            </Link>
            <Link href="/products/special-offers" className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-sm font-semibold transition-all">
              Special Offers
            </Link>
            <Link href="/products/kcb-offers" className="px-4 py-2 bg-green-600/90 hover:bg-green-600 rounded-full text-sm font-semibold transition-all">
              KCB Financing
            </Link>
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
                onClick={() => {
                  setSelectedBrand('all');
                  setSelectedCategory('all');
                  setSelectedPrice('all');
                }}
                className="inline-flex items-center justify-center px-6 py-3 bg-[#E31E24] text-white rounded-lg font-semibold hover:bg-[#B71C1C] transition-all"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-[#E31E24] to-[#B71C1C] rounded-3xl p-12 text-center text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Can&apos;t Find What You&apos;re Looking For?
            </h2>
            <p className="text-lg text-red-100 max-w-2xl mx-auto mb-8">
              Contact us directly and we&apos;ll help you find the perfect device for your needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-[#E31E24] rounded-lg font-bold text-base hover:bg-gray-100 transition-all shadow-lg"
              >
                Contact Us
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <a
                href="https://wa.me/254788740000"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-green-500 text-white rounded-lg font-bold text-base hover:bg-green-600 transition-all shadow-lg"
              >
                <svg className="mr-2 w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-[#E31E24] to-[#B71C1C] text-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">All Products</h1>
            <p className="text-lg text-red-100 max-w-3xl mx-auto">
              Browse our complete collection of smartphones, tablets, TVs, and accessories
            </p>
          </div>
        </section>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#E31E24]"></div>
        </div>
      </div>
    }>
      <ProductsContent />
    </Suspense>
  );
}

