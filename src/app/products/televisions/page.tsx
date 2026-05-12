'use client';

import { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { getTelevisions } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import FilterDrawer from '@/components/filters/FilterDrawer';
import FilterButton from '@/components/filters/FilterButton';
import type { FilterConfig } from '@/components/filters/FilterSection';

function TelevisionsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const isInitialized = useRef(false);

  const televisions = getTelevisions();

  // Initialize state from URL parameters
  const [selectedBrand, setSelectedBrand] = useState<string>(() => searchParams.get('brand') || 'all');
  const [selectedSize, setSelectedSize] = useState<string>(() => searchParams.get('size') || 'all');
  const [selectedPrice, setSelectedPrice] = useState<string>(() => searchParams.get('price') || 'all');
  const [sortBy, setSortBy] = useState<string>(() => searchParams.get('sort') || 'featured');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Get unique brands
  const brands = ['all', ...Array.from(new Set(televisions.map(p => p.brand)))].sort();

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
      if (selectedSize !== 'all') params.set('size', selectedSize);
      if (selectedPrice !== 'all') params.set('price', selectedPrice);
      if (sortBy !== 'featured') params.set('sort', sortBy);

      const queryString = params.toString();
      const newUrl = queryString ? `/products/televisions?${queryString}` : '/products/televisions';

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [selectedBrand, selectedSize, selectedPrice, sortBy, router]);

  // Filter products
  let filteredProducts = televisions.filter(product => {
    const brandMatch = selectedBrand === 'all' || product.brand.toLowerCase() === selectedBrand.toLowerCase();

    let sizeMatch = true;
    if (selectedSize !== 'all' && product.specs) {
      const specs = (typeof product.specs === 'string' ? product.specs : product.specs.join(' ')).toLowerCase();
      switch (selectedSize) {
        case 'under-43':
          sizeMatch = specs.includes('32"') || specs.includes('40"');
          break;
        case '43-55':
          sizeMatch = specs.includes('43"') || specs.includes('50"') || specs.includes('55"');
          break;
        case 'above-55':
          sizeMatch = specs.includes('65"') || specs.includes('75"') || specs.includes('85"');
          break;
      }
    }

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
        case '100k-200k':
          priceMatch = price >= 100000 && price < 200000;
          break;
        case 'above-200k':
          priceMatch = price >= 200000;
          break;
      }
    }

    return brandMatch && sizeMatch && priceMatch;
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
    selectedSize !== 'all',
    selectedPrice !== 'all',
    sortBy !== 'featured',
  ].filter(Boolean).length;

  // Clear all filters
  const handleClearAll = () => {
    setSelectedBrand('all');
    setSelectedSize('all');
    setSelectedPrice('all');
    setSortBy('featured');
  };

  // Filter configuration
  const filterConfig: FilterConfig[] = [
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
      title: 'Screen Size',
      options: [
        { value: 'all', label: 'All Sizes' },
        { value: 'under-43', label: 'Under 43"' },
        { value: '43-55', label: '43" - 55"' },
        { value: 'above-55', label: 'Above 55"' },
      ],
      selectedValue: selectedSize,
      onValueChange: setSelectedSize,
      type: 'radio',
      defaultExpanded: true,
    },
    {
      title: 'Price Range',
      options: [
        { value: 'all', label: 'All Prices' },
        { value: 'under-50k', label: 'Under KSh 50,000' },
        { value: '50k-100k', label: 'KSh 50,000 - 100,000' },
        { value: '100k-200k', label: 'KSh 100,000 - 200,000' },
        { value: 'above-200k', label: 'Above KSh 200,000' },
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
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a] mb-4">Televisions</h1>
          <p className="text-lg text-[#6b6b6b] max-w-3xl mx-auto">
            Smart TVs and entertainment systems from leading brands
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

      {/* Products Grid - 3 columns max for TVs */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                className="inline-flex items-center justify-center px-6 py-3 bg-[#0066ff] text-white rounded-lg font-semibold hover:bg-[#0052cc] transition-all"
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

export default function TelevisionsPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white">
        <section className="bg-[#f8f8f6] py-16 md:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[#0a0a0a] mb-4">Televisions</h1>
            <p className="text-lg text-[#6b6b6b] max-w-3xl mx-auto">
              Smart TVs and entertainment systems from leading brands
            </p>
          </div>
        </section>
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0066ff]"></div>
        </div>
      </div>
    }>
      <TelevisionsContent />
    </Suspense>
  );
}
