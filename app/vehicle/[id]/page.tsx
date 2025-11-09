'use client';

import { getVehicleById } from '@/lib/vehicles';
import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Settings, Check } from 'lucide-react';
import FinanceCalculator from '@/components/FinanceCalculator';
import LeaseCalculator from '@/components/LeaseCalculator';

export default function VehicleDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const vehicle = getVehicleById(id);

  if (!vehicle) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-toyota-red transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Search
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">
            {vehicle.year} Toyota {vehicle.model} {vehicle.trim}
          </h1>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Vehicle Info */}
          <div className="space-y-6">
            {/* Image Placeholder */}
            <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200">
              <div className="h-96 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Settings className="w-24 h-24 mx-auto mb-4 opacity-50" />
                  <p className="text-xl font-medium">{vehicle.model}</p>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Pricing</h2>
              <div className="text-4xl font-bold text-toyota-red mb-2">
                ${vehicle.price.toLocaleString()}
              </div>
              <p className="text-gray-600">MSRP Starting Price</p>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Year</p>
                  <p className="font-semibold text-gray-900">{vehicle.year}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Model</p>
                  <p className="font-semibold text-gray-900">{vehicle.model}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Trim</p>
                  <p className="font-semibold text-gray-900">{vehicle.trim}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Category</p>
                  <p className="font-semibold text-gray-900">{vehicle.category}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Fuel Type</p>
                  <p className="font-semibold text-gray-900">{vehicle.fuelType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Drivetrain</p>
                  <p className="font-semibold text-gray-900">{vehicle.drivetrain}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Engine</p>
                  <p className="font-semibold text-gray-900">{vehicle.engine}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Horsepower</p>
                  <p className="font-semibold text-gray-900">{vehicle.horsepower} HP</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">MPG (City/Highway)</p>
                  <p className="font-semibold text-gray-900">
                    {vehicle.mpg.city}/{vehicle.mpg.highway}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Seating</p>
                  <p className="font-semibold text-gray-900">{vehicle.seating} Seats</p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Features</h2>
              <div className="grid grid-cols-1 gap-2">
                {vehicle.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-gray-700">
                    <Check className="w-5 h-5 text-toyota-red mr-2 flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{vehicle.description}</p>
            </div>
          </div>

          {/* Right Column - Calculators */}
          <div className="space-y-6">
            <FinanceCalculator vehiclePrice={vehicle.price} />
            <LeaseCalculator vehiclePrice={vehicle.price} />
          </div>
        </div>
      </div>
    </div>
  );
}

