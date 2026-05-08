'use client';

import { Filter } from 'lucide-react';

interface FilterButtonProps {
  onClick: () => void;
  activeFiltersCount: number;
}

export default function FilterButton({ onClick, activeFiltersCount }: FilterButtonProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-30 bg-gradient-to-r from-[#E31E24] to-[#B71C1C] text-white p-4 rounded-full shadow-2xl hover:shadow-[#E31E24]/50 transition-all duration-300 hover:scale-110 active:scale-95 flex items-center justify-center"
      aria-label="Open filters"
    >
      <Filter className="w-5 h-5" />
      {activeFiltersCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-white text-[#E31E24] text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-lg">
          {activeFiltersCount}
        </span>
      )}
    </button>
  );
}
