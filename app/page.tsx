'use client';

import { useState, useMemo, useEffect } from 'react';
import { vehicles, filterVehicles } from '@/lib/vehicles';
import { Vehicle, FilterPreferences } from '@/lib/types';
import VehicleCard from '@/components/VehicleCard';
import FilterPanel from '@/components/FilterPanel';
import ComparisonPanel from '@/components/ComparisonPanel';
import NavigationBar from '@/components/NavigationBar';
import { Search, X, Car, TrendingUp, Calculator, GitCompare, Shield, Users, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function Home() {
  const [filters, setFilters] = useState<FilterPreferences>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVehicles, setSelectedVehicles] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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

  const handleScrollToVehicles = () => {
    const element = document.getElementById('vehicles');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Find your perfect vehicle with advanced filtering and search capabilities.',
      color: 'text-blue-500',
      bgColor: 'bg-blue-50',
    },
    {
      icon: GitCompare,
      title: 'Compare Vehicles',
      description: 'Side-by-side comparison of up to 3 vehicles to make the best decision.',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
    },
    {
      icon: Calculator,
      title: 'Financing Calculator',
      description: 'Calculate monthly payments for financing and leasing options.',
      color: 'text-green-500',
      bgColor: 'bg-green-50',
    },
    {
      icon: Shield,
      title: 'Trusted Information',
      description: 'Get accurate pricing, specifications, and features for all Toyota models.',
      color: 'text-red-500',
      bgColor: 'bg-red-50',
    },
  ];

  const stats = [
    { label: 'Vehicle Models', value: '12+', icon: Car },
    { label: 'Happy Customers', value: '10K+', icon: Users },
    { label: 'Years Experience', value: '50+', icon: TrendingUp },
    { label: 'Satisfaction Rate', value: '98%', icon: CheckCircle2 },
  ];

  return (
    <div className="min-h-screen bg-white">
      <NavigationBar />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-toyota-red via-red-600 to-red-800">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className={`space-y-4 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-normal md:leading-relaxed animate-fade-in-down">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-yellow-200 animate-gradient pb-2 mt-0">
                Find Your Dream Toyota Vehicle
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Discover the perfect Toyota that matches your lifestyle. Search, compare, and calculate financing options all in one place.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <button
                onClick={handleScrollToVehicles}
                className="group px-8 py-4 bg-white text-toyota-red rounded-full font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2"
              >
                Browse Vehicles
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="#features"
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 transform hover:scale-105"
              >
                Learn More
              </a>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            {stats.map((stat, index) => (
              <div
                key={stat.label}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${0.7 + index * 0.1}s` }}
              >
                <stat.icon className="w-8 h-8 text-white mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce-slow">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Our Platform?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to find and finance your perfect Toyota vehicle
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vehicle Finder Section */}
      <section id="vehicles" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Explore Our Vehicle Collection
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find the perfect Toyota that matches your needs and budget
            </p>
          </div>

          {/* Comparison Button */}
            {selectedVehicles.length > 0 && (
            <div className="mb-6 flex justify-center animate-scale-in">
              <button
                onClick={() => setShowComparison(!showComparison)}
                className="px-8 py-3 bg-toyota-red text-white rounded-full hover:bg-red-700 transition-all duration-300 font-medium transform hover:scale-105 shadow-lg flex items-center gap-2"
              >
                <GitCompare className="w-5 h-5" />
                {showComparison ? 'Hide' : 'Compare'} ({selectedVehicles.length})
              </button>
            </div>
            )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
            <aside className="lg:w-80 flex-shrink-0 animate-slide-in-left">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={clearFilters}
            />
          </aside>

          {/* Main Content */}
            <main className="flex-1 animate-slide-in-right">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search by model, trim, or year..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toyota-red focus:border-transparent transition-all duration-300"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
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
                <div className="mb-6 animate-scale-in">
                <ComparisonPanel vehicles={selectedVehicleObjects} />
              </div>
            )}

            {/* Vehicle Grid */}
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredVehicles.map((vehicle, index) => (
                    <div
                      key={vehicle.id}
                      className="animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    >
                  <VehicleCard
                    vehicle={vehicle}
                    isSelected={selectedVehicles.includes(vehicle.id)}
                    onToggleSelect={() => toggleVehicleSelection(vehicle.id)}
                  />
                    </div>
                ))}
              </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200 animate-fade-in">
                <p className="text-gray-500 text-lg">No vehicles found matching your criteria.</p>
                <button
                  onClick={clearFilters}
                    className="mt-4 text-toyota-red hover:underline transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Your Trusted Toyota Partner
              </h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                We're dedicated to helping you find the perfect Toyota vehicle that fits your lifestyle, 
                budget, and preferences. Our comprehensive platform makes car shopping easy, transparent, 
                and enjoyable.
              </p>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed">
                With advanced search filters, side-by-side comparisons, and financing calculators, 
                you have all the tools you need to make an informed decision about your next vehicle.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Free to Use</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>No Hidden Fees</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span>Accurate Pricing</span>
                </div>
              </div>
            </div>
            <div className="animate-slide-in-right">
              <div className="relative">
                <div className="absolute inset-0 bg-toyota-red/20 rounded-3xl blur-3xl transform rotate-6" />
                <div className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20">
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-toyota-red rounded-full flex items-center justify-center">
                        <Car className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Wide Selection</h3>
                        <p className="text-gray-300">12+ Toyota models to choose from</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                        <Calculator className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Financing Tools</h3>
                        <p className="text-gray-300">Calculate payments instantly</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                        <GitCompare className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">Easy Comparison</h3>
                        <p className="text-gray-300">Compare up to 3 vehicles side-by-side</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Car className="w-8 h-8 text-toyota-red" />
              <span className="text-2xl font-bold">Toyota Vehicle Finder</span>
            </div>
            <p className="text-gray-400 mb-6">
              Find your dream Toyota vehicle with ease
            </p>
            <div className="flex justify-center gap-6">
              <a href="#home" className="text-gray-400 hover:text-white transition-colors">Home</a>
              <a href="#vehicles" className="text-gray-400 hover:text-white transition-colors">Vehicles</a>
              <a href="#features" className="text-gray-400 hover:text-white transition-colors">Features</a>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors">About</a>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-800 text-gray-500 text-sm">
              © 2024 Toyota Vehicle Finder. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
