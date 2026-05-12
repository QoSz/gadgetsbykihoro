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
      className="fixed bottom-6 right-6 z-30 bg-[#0066ff] text-white p-4 rounded-xl shadow-lg hover:bg-[#0052cc] transition-colors duration-200 flex items-center justify-center"
      aria-label="Open filters"
    >
      <Filter className="w-5 h-5" />
      {activeFiltersCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-white text-[#0066ff] text-xs font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center shadow-sm">
          {activeFiltersCount}
        </span>
      )}
    </button>
  );
}
