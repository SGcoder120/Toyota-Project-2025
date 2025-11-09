'use client';

import { useState } from 'react';
import { calculateLeasePayment, calculateTotalLeaseCost } from '@/lib/calculations';
import { DollarSign, Percent, Calendar } from 'lucide-react';

interface LeaseCalculatorProps {
  vehiclePrice: number;
}

export default function LeaseCalculator({ vehiclePrice }: LeaseCalculatorProps) {
  const [downPayment, setDownPayment] = useState(3000);
  const [moneyFactor, setMoneyFactor] = useState(0.0015);
  const [leaseTerm, setLeaseTerm] = useState(36);
  const [residualValue, setResidualValue] = useState(60);

  const monthlyPayment = calculateLeasePayment(vehiclePrice, {
    downPayment,
    moneyFactor,
    leaseTerm,
    residualValue,
  });

  const totalCost = calculateTotalLeaseCost(vehiclePrice, {
    downPayment,
    moneyFactor,
    leaseTerm,
    residualValue,
  });

  const residualAmount = vehiclePrice * (residualValue / 100);

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Lease Calculator</h2>
      
      <div className="space-y-6">
        {/* Vehicle Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Vehicle Price
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={vehiclePrice}
              readOnly
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700"
            />
          </div>
        </div>

        {/* Down Payment */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Down Payment
          </label>
          <div className="relative">
            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              min="0"
              max={vehiclePrice}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toyota-red focus:border-transparent"
            />
          </div>
          <div className="mt-2">
            <input
              type="range"
              min="0"
              max={vehiclePrice}
              step="500"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>$0</span>
              <span>${vehiclePrice.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Money Factor */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Money Factor (e.g., 0.0015 = 3.6% APR)
          </label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={moneyFactor}
              onChange={(e) => setMoneyFactor(Number(e.target.value))}
              min="0"
              max="0.01"
              step="0.0001"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toyota-red focus:border-transparent"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            APR: {(moneyFactor * 2400).toFixed(2)}%
          </p>
        </div>

        {/* Lease Term */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lease Term (Months)
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={leaseTerm}
              onChange={(e) => setLeaseTerm(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toyota-red focus:border-transparent"
            >
              <option value="24">24 months (2 years)</option>
              <option value="36">36 months (3 years)</option>
              <option value="39">39 months</option>
              <option value="48">48 months (4 years)</option>
            </select>
          </div>
        </div>

        {/* Residual Value */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Residual Value (%)
          </label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={residualValue}
              onChange={(e) => setResidualValue(Number(e.target.value))}
              min="40"
              max="80"
              step="1"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toyota-red focus:border-transparent"
            />
          </div>
          <div className="mt-2">
            <input
              type="range"
              min="40"
              max="80"
              step="1"
              value={residualValue}
              onChange={(e) => setResidualValue(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>40%</span>
              <span>80%</span>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="bg-gray-50 rounded-lg p-6 space-y-4 border border-gray-200">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">Monthly Payment</p>
            <p className="text-4xl font-bold text-toyota-red">
              ${monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-300">
            <div>
              <p className="text-xs text-gray-600 mb-1">Residual Value</p>
              <p className="text-lg font-semibold text-gray-900">
                ${residualAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Total Lease Cost</p>
              <p className="text-lg font-semibold text-gray-900">
                ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

