'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getSmartphones, getTablets } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import FilterDrawer from '@/components/filters/FilterDrawer';
import FilterButton from '@/components/filters/FilterButton';
import type { FilterConfig } from '@/components/filters/FilterSection';

function PhonesTabletsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isInitialized = useRef(false);

  const smartphones = getSmartphones();
  const tablets = getTablets();
  const allDevices = [...smartphones, ...tablets];

  // Initialize state from URL parameters
  const [selectedBrand, setSelectedBrand] = useState<string>(() => searchParams.get('brand') || 'all');
  const [selectedType, setSelectedType] = useState<string>(() => searchParams.get('type') || 'all');
  const [selectedPrice, setSelectedPrice] = useState<string>(() => searchParams.get('price') || 'all');
  const [sortBy, setSortBy] = useState<string>(() => searchParams.get('sort') || 'featured');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Get unique brands
  const brands = ['all', ...Array.from(new Set(allDevices.map(p => p.brand)))].sort();

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
      if (selectedType !== 'all') params.set('type', selectedType);
      if (selectedPrice !== 'all') params.set('price', selectedPrice);
      if (sortBy !== 'featured') params.set('sort', sortBy);

      const queryString = params.toString();
      const newUrl = queryString ? `/products/phones-tablets?${queryString}` : '/products/phones-tablets';

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedBrand, selectedType, selectedPrice, sortBy, router]);

  // Filter products
  let filteredProducts = allDevices.filter(product => {
    const brandMatch = selectedBrand === 'all' || product.brand.toLowerCase() === selectedBrand.toLowerCase();
    const typeMatch = selectedType === 'all' || product.category === selectedType;

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

    return brandMatch && typeMatch && priceMatch;
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
    selectedType !== 'all',
    selectedPrice !== 'all',
    sortBy !== 'featured',
  ].filter(Boolean).length;

  // Clear all filters
  const handleClearAll = () => {
    setSelectedBrand('all');
    setSelectedType('all');
    setSelectedPrice('all');
    setSortBy('featured');
  };

  // Filter configuration
  const filterConfig: FilterConfig[] = [
    {
      title: 'Device Type',
      options: [
        { value: 'all', label: 'All Devices' },
        { value: 'smartphone', label: 'Smartphones' },
        { value: 'tablet', label: 'Tablets' },
      ],
      selectedValue: selectedType,
      onValueChange: setSelectedType,
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
      <section className="bg-gradient-to-r from-[#007aff] to-[#0056b3] text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Phones & Tablets</h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Discover the latest smartphones and tablets from top brands
          </p>
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
                className="inline-flex items-center justify-center px-6 py-3 bg-[#007aff] text-white rounded-lg font-semibold hover:bg-[#0056b3] transition-all"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Authentic Products
              </h3>
              <p className="text-gray-600">
                100% genuine devices from authorized distributors
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Flexible Payments
              </h3>
              <p className="text-gray-600">
                Competitive pricing with flexible payment options
              </p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Warranty Included
              </h3>
              <p className="text-gray-600">
                All devices come with manufacturer warranty
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default function PhonesTabletsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-[#007aff] to-[#0056b3] text-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Phones & Tablets</h1>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              Discover the latest smartphones and tablets from top brands
            </p>
          </div>
        </section>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007aff]"></div>
        </div>
      </div>
    }>
      <PhonesTabletsContent />
    </Suspense>
  );
}
