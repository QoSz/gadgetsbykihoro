'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import FilterSection from './FilterSection';
import type { FilterConfig } from './FilterSection';

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterConfig[];
  activeFiltersCount: number;
  onClearAll: () => void;
  resultCount?: number;
}

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  activeFiltersCount,
  onClearAll,
  resultCount,
}: FilterDrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className="fixed inset-y-0 left-0 w-[85vw] max-w-sm bg-white shadow-xl z-50 overflow-y-auto animate-in slide-in-from-left duration-300"
        role="dialog"
        aria-modal="true"
        aria-label="Filter products"
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 z-10">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-[#0a0a0a]">Filters</h2>
            <button
              onClick={onClose}
              className="p-2 -mr-2 hover:bg-[#f8f8f6] rounded-xl transition-colors duration-200"
              aria-label="Close filters"
            >
              <X className="w-5 h-5 text-[#6b6b6b]" />
            </button>
          </div>

          {/* Active Filters Badge */}
          {activeFiltersCount > 0 && (
            <div className="mt-3 flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#0066ff]/10 text-[#0066ff] text-xs font-semibold rounded-lg">
                {activeFiltersCount} {activeFiltersCount === 1 ? 'Filter' : 'Filters'} Active
              </div>
              <button
                onClick={onClearAll}
                className="text-sm text-[#0066ff] hover:text-[#0052cc] font-medium transition-colors duration-200"
              >
                Clear All
              </button>
            </div>
          )}

          {/* Results Count */}
          {resultCount !== undefined && (
            <p className="mt-3 text-sm text-[#6b6b6b]">
              Showing <span className="font-semibold text-[#0a0a0a]">{resultCount}</span>{' '}
              {resultCount === 1 ? 'product' : 'products'}
            </p>
          )}
        </div>

        {/* Filter Sections */}
        <div className="px-6 py-4 space-y-4 pb-24">
          {filters.map((filter, index) => (
            <FilterSection
              key={`${filter.title}-${index}`}
              title={filter.title}
              options={filter.options}
              selectedValue={filter.selectedValue}
              onValueChange={filter.onValueChange}
              type={filter.type}
              defaultExpanded={filter.defaultExpanded}
            />
          ))}
        </div>

        {/* Footer - Apply Button */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full bg-[#0066ff] text-white font-semibold py-3.5 rounded-xl hover:bg-[#0052cc] transition-colors duration-200"
          >
            View {resultCount || 0} {resultCount === 1 ? 'Product' : 'Products'}
          </button>
        </div>
      </div>
    </>
  );
}
