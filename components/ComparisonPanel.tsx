'use client';

import { Vehicle } from '@/lib/types';
import { X, Fuel, Users, Settings } from 'lucide-react';

interface ComparisonPanelProps {
  vehicles: Vehicle[];
}

export default function ComparisonPanel({ vehicles }: ComparisonPanelProps) {
  if (vehicles.length === 0) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Compare Vehicles</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-700">Specification</th>
              {vehicles.map(vehicle => (
                <th key={vehicle.id} className="text-center py-3 px-4">
                  <div className="font-semibold text-gray-900">
                    {vehicle.year} {vehicle.model}
                  </div>
                  <div className="text-sm text-gray-600 mt-1">{vehicle.trim}</div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-medium text-gray-700">Price</td>
              {vehicles.map(vehicle => (
                <td key={vehicle.id} className="py-3 px-4 text-center">
                  <span className="text-toyota-red font-bold">
                    ${vehicle.price.toLocaleString()}
                  </span>
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-medium text-gray-700">Fuel Type</td>
              {vehicles.map(vehicle => (
                <td key={vehicle.id} className="py-3 px-4 text-center text-gray-600">
                  {vehicle.fuelType}
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-medium text-gray-700">Drivetrain</td>
              {vehicles.map(vehicle => (
                <td key={vehicle.id} className="py-3 px-4 text-center text-gray-600">
                  {vehicle.drivetrain}
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-medium text-gray-700">Engine</td>
              {vehicles.map(vehicle => (
                <td key={vehicle.id} className="py-3 px-4 text-center text-gray-600">
                  {vehicle.engine}
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-medium text-gray-700">Horsepower</td>
              {vehicles.map(vehicle => (
                <td key={vehicle.id} className="py-3 px-4 text-center text-gray-600">
                  {vehicle.horsepower} HP
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-medium text-gray-700">MPG (City/Highway)</td>
              {vehicles.map(vehicle => (
                <td key={vehicle.id} className="py-3 px-4 text-center text-gray-600">
                  {vehicle.mpg.city}/{vehicle.mpg.highway}
                </td>
              ))}
            </tr>
            <tr className="border-b border-gray-100">
              <td className="py-3 px-4 font-medium text-gray-700">Seating</td>
              {vehicles.map(vehicle => (
                <td key={vehicle.id} className="py-3 px-4 text-center text-gray-600">
                  {vehicle.seating}
                </td>
              ))}
            </tr>
            <tr>
              <td className="py-3 px-4 font-medium text-gray-700">Key Features</td>
              {vehicles.map(vehicle => (
                <td key={vehicle.id} className="py-3 px-4">
                  <ul className="text-sm text-gray-600 space-y-1">
                    {vehicle.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx}>• {feature}</li>
                    ))}
                  </ul>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

