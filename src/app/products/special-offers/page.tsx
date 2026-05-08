'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getSpecialOffers } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import FilterDrawer from '@/components/filters/FilterDrawer';
import FilterButton from '@/components/filters/FilterButton';
import type { FilterConfig } from '@/components/filters/FilterSection';

function SpecialOffersContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isInitialized = useRef(false);

  const specialOffers = getSpecialOffers();

  // Initialize state from URL parameters
  const [selectedCategory, setSelectedCategory] = useState<string>(() => searchParams.get('category') || 'all');
  const [selectedBrand, setSelectedBrand] = useState<string>(() => searchParams.get('brand') || 'all');
  const [selectedDiscount, setSelectedDiscount] = useState<string>(() => searchParams.get('discount') || 'all');
  const [sortBy, setSortBy] = useState<string>(() => searchParams.get('sort') || 'discount');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Get unique brands and categories
  const brands = ['all', ...Array.from(new Set(specialOffers.map(p => p.brand)))].sort();
  const categories = ['all', ...Array.from(new Set(specialOffers.map(p => p.category)))].sort();

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
      if (selectedDiscount !== 'all') params.set('discount', selectedDiscount);
      if (sortBy !== 'discount') params.set('sort', sortBy);

      const queryString = params.toString();
      const newUrl = queryString ? `/products/special-offers?${queryString}` : '/products/special-offers';

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedCategory, selectedBrand, selectedDiscount, sortBy, router]);

  // Filter products
  let filteredProducts = specialOffers.filter(product => {
    const brandMatch = selectedBrand === 'all' || product.brand.toLowerCase() === selectedBrand.toLowerCase();
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;

    let discountMatch = true;
    if (selectedDiscount !== 'all' && product.discount) {
      const discount = product.discount;
      switch (selectedDiscount) {
        case 'under-10':
          discountMatch = discount < 10;
          break;
        case '10-20':
          discountMatch = discount >= 10 && discount < 20;
          break;
        case 'above-20':
          discountMatch = discount >= 20;
          break;
      }
    }

    return brandMatch && categoryMatch && discountMatch;
  });

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'discount':
        return (b.discount || 0) - (a.discount || 0);
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
    selectedDiscount !== 'all',
    sortBy !== 'discount',
  ].filter(Boolean).length;

  // Clear all filters
  const handleClearAll = () => {
    setSelectedBrand('all');
    setSelectedCategory('all');
    setSelectedDiscount('all');
    setSortBy('discount');
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
      title: 'Discount',
      options: [
        { value: 'all', label: 'All Discounts' },
        { value: 'under-10', label: 'Under 10%' },
        { value: '10-20', label: '10% - 20%' },
        { value: 'above-20', label: 'Above 20%' },
      ],
      selectedValue: selectedDiscount,
      onValueChange: setSelectedDiscount,
      type: 'radio',
      defaultExpanded: true,
    },
    {
      title: 'Sort By',
      options: [
        { value: 'discount', label: 'Highest Discount' },
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
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Special Offers</h1>
          <p className="text-lg text-blue-100 max-w-3xl mx-auto">
            Exclusive deals and limited-time offers on your favorite devices
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
    </div>
  );
}

export default function SpecialOffersPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-[#007aff] to-[#0056b3] text-white py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Special Offers</h1>
            <p className="text-lg text-blue-100 max-w-3xl mx-auto">
              Exclusive deals and limited-time offers on your favorite devices
            </p>
          </div>
        </section>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#007aff]"></div>
        </div>
      </div>
    }>
      <SpecialOffersContent />
    </Suspense>
  );
}
