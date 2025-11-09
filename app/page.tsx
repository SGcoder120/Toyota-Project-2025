'use client';

import { useState, useMemo } from 'react';
import { vehicles, filterVehicles } from '@/lib/vehicles';
import { Vehicle, FilterPreferences } from '@/lib/types';
import VehicleCard from '@/components/VehicleCard';
import FilterPanel from '@/components/FilterPanel';
import ComparisonPanel from '@/components/ComparisonPanel';
import { Search, X } from 'lucide-react';

export default function Home() {
  const [filters, setFilters] = useState<FilterPreferences>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  const filteredVehicles = useMemo(() => {
    return filterVehicles({
      ...filters,
      searchQuery,
    });
  }, [filters, searchQuery]);

  const handleFilterChange = (newFilters: FilterPreferences) => {
    setFilters(newFilters);
  };

  const toggleVehicleSelection = (vehicleId: string) => {
    setSelectedVehicles(prev => {
      if (prev.includes(vehicleId)) {
        return prev.filter(id => id !== vehicleId);
      } else if (prev.length < 3) {
        return [...prev, vehicleId];
      }
      return prev;
    });
  };

  const clearFilters = () => {
    setFilters({});
    setSearchQuery('');
  };

  const selectedVehicleObjects = selectedVehicles
    .map(id => vehicles.find(v => v.id === id))
    .filter((v): v is Vehicle => v !== undefined);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-toyota-red">Toyota Vehicle Finder</h1>
              <p className="text-gray-600 mt-1">Find your dream car with ease</p>
            </div>
            {selectedVehicles.length > 0 && (
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="px-6 py-2 bg-toyota-red text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                {showComparison ? 'Hide' : 'Compare'} ({selectedVehicles.length})
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-80 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={clearFilters}
            />
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by model, trim, or year..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toyota-red focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* Results Count */}
            <div className="mb-4 flex items-center justify-between">
              <p className="text-gray-600">
                Found <span className="font-semibold text-gray-900">{filteredVehicles.length}</span> vehicles
              </p>
            </div>

            {/* Comparison Panel */}
            {showComparison && selectedVehicleObjects.length > 0 && (
              <div className="mb-6">
                <ComparisonPanel vehicles={selectedVehicleObjects} />
              </div>
            )}

            {/* Vehicle Grid */}
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVehicles.map(vehicle => (
                  <VehicleCard
                    key={vehicle.id}
                    vehicle={vehicle}
                    isSelected={selectedVehicles.includes(vehicle.id)}
                    onToggleSelect={() => toggleVehicleSelection(vehicle.id)}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <p className="text-gray-500 text-lg">No vehicles found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 text-toyota-red hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

