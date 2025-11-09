'use client';

import { Vehicle } from '@/lib/types';
import { CheckCircle2, Circle, Fuel, Users, Settings } from 'lucide-react';
import Link from 'next/link';

interface VehicleCardProps {
  vehicle: Vehicle;
  isSelected: boolean;
  onToggleSelect: () => void;
}

export default function VehicleCard({ vehicle, isSelected, onToggleSelect }: VehicleCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden border border-gray-200">
      {/* Image Placeholder */}
      <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center relative">
        <div className="text-center text-gray-500">
          <Settings className="w-16 h-16 mx-auto mb-2 opacity-50" />
          <p className="text-sm font-medium">{vehicle.model}</p>
        </div>
        <button
          onClick={onToggleSelect}
          className="absolute top-3 right-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
          title={isSelected ? 'Remove from comparison' : 'Add to comparison'}
        >
          {isSelected ? (
            <CheckCircle2 className="w-5 h-5 text-toyota-red" />
          ) : (
            <Circle className="w-5 h-5 text-gray-400" />
          )}
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1">
            {vehicle.year} Toyota {vehicle.model}
          </h3>
          <p className="text-gray-600 text-sm">{vehicle.trim}</p>
        </div>

        <div className="mb-4">
          <p className="text-2xl font-bold text-toyota-red">
            ${vehicle.price.toLocaleString()}
          </p>
          <p className="text-xs text-gray-500">MSRP</p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
          <div className="flex items-center text-gray-600">
            <Fuel className="w-4 h-4 mr-2 text-gray-400" />
            <span>{vehicle.mpg.city}/{vehicle.mpg.highway} MPG</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Users className="w-4 h-4 mr-2 text-gray-400" />
            <span>{vehicle.seating} Seats</span>
          </div>
          <div className="text-gray-600">
            <span className="font-medium">Fuel:</span> {vehicle.fuelType}
          </div>
          <div className="text-gray-600">
            <span className="font-medium">Drive:</span> {vehicle.drivetrain}
          </div>
        </div>

        {/* Features Preview */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Key Features:</p>
          <div className="flex flex-wrap gap-1">
            {vehicle.features.slice(0, 3).map((feature, idx) => (
              <span
                key={idx}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded"
              >
                {feature}
              </span>
            ))}
            {vehicle.features.length > 3 && (
              <span className="text-xs text-gray-500 px-2 py-1">
                +{vehicle.features.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            href={`/vehicle/${vehicle.id}`}
            className="flex-1 bg-toyota-red text-white text-center py-2 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium text-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}

