'use client';

import { FilterPreferences } from '@/lib/types';
import { Slider } from '@/components/Slider';
import { X } from 'lucide-react';

interface FilterPanelProps {
  filters: FilterPreferences;
  onFilterChange: (filters: FilterPreferences) => void;
  onClear: () => void;
}

export default function FilterPanel({ filters, onFilterChange, onClear }: FilterPanelProps) {
  const hasActiveFilters = Object.keys(filters).length > 0;

  const updateFilter = (key: keyof FilterPreferences, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value || undefined,
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Filters</h2>
        {hasActiveFilters && (
          <button
            onClick={onClear}
            className="text-sm text-toyota-red hover:underline flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear
          </button>
        )}
      </div>

      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Price Range
          </label>
          <div className="space-y-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Min Price</label>
              <input
                type="number"
                placeholder="0"
                value={filters.minPrice || ''}
                onChange={(e) => updateFilter('minPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toyota-red focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Max Price</label>
              <input
                type="number"
                placeholder="No limit"
                value={filters.maxPrice || ''}
                onChange={(e) => updateFilter('maxPrice', e.target.value ? Number(e.target.value) : undefined)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toyota-red focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Category
          </label>
          <select
            value={filters.category || ''}
            onChange={(e) => updateFilter('category', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toyota-red focus:border-transparent"
          >
            <option value="">All Categories</option>
            <option value="Sedan">Sedan</option>
            <option value="SUV">SUV</option>
            <option value="Truck">Truck</option>
            <option value="Van">Van</option>
            <option value="Coupe">Coupe</option>
          </select>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Fuel Type
          </label>
          <select
            value={filters.fuelType || ''}
            onChange={(e) => updateFilter('fuelType', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toyota-red focus:border-transparent"
          >
            <option value="">All Fuel Types</option>
            <option value="Gasoline">Gasoline</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Electric">Electric</option>
            <option value="Plug-in Hybrid">Plug-in Hybrid</option>
          </select>
        </div>

        {/* Drivetrain */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Drivetrain
          </label>
          <select
            value={filters.drivetrain || ''}
            onChange={(e) => updateFilter('drivetrain', e.target.value || undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toyota-red focus:border-transparent"
          >
            <option value="">All Drivetrains</option>
            <option value="FWD">Front-Wheel Drive</option>
            <option value="RWD">Rear-Wheel Drive</option>
            <option value="AWD">All-Wheel Drive</option>
            <option value="4WD">4-Wheel Drive</option>
          </select>
        </div>

        {/* Min MPG */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Minimum Highway MPG
          </label>
          <input
            type="number"
            placeholder="0"
            value={filters.minMpg || ''}
            onChange={(e) => updateFilter('minMpg', e.target.value ? Number(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toyota-red focus:border-transparent"
          />
        </div>
      </div>
    </div>
  );
}

