'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface FilterConfig {
  title: string;
  options: FilterOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  type?: 'radio' | 'select';
  defaultExpanded?: boolean;
}

interface FilterSectionProps {
  title: string;
  options: FilterOption[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  type?: 'radio' | 'select';
  defaultExpanded?: boolean;
}

export default function FilterSection({
  title,
  options,
  selectedValue,
  onValueChange,
  type = 'radio',
  defaultExpanded = true,
}: FilterSectionProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  if (type === 'select') {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-gray-900">
          {title}
        </label>
        <select
          value={selectedValue}
          onChange={(e) => onValueChange(e.target.value)}
          className="w-full px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#E31E24] focus:border-[#E31E24] transition-all"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  return (
    <div className="border-b border-gray-200 pb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full py-2 text-left group"
        aria-expanded={isExpanded}
      >
        <span className="text-sm font-semibold text-gray-900">{title}</span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-gray-500 group-hover:text-[#E31E24] transition-colors" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500 group-hover:text-[#E31E24] transition-colors" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-3 space-y-2.5 animate-in slide-in-from-top-2 duration-200">
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-3 cursor-pointer group py-1"
            >
              <input
                type="radio"
                name={title}
                value={option.value}
                checked={selectedValue === option.value}
                onChange={(e) => onValueChange(e.target.value)}
                className="w-4 h-4 text-[#E31E24] border-gray-300 focus:ring-[#E31E24] focus:ring-2 cursor-pointer"
              />
              <span className="flex-1 text-sm text-gray-700 group-hover:text-gray-900 transition-colors">
                {option.label}
              </span>
              {option.count !== undefined && (
                <span className="text-xs text-gray-500">({option.count})</span>
              )}
            </label>
          ))}
        </div>
      )}
    </div>
  );
}
