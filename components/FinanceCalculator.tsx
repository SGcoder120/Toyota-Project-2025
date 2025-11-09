'use client';

import { useState } from 'react';
import { calculateMonthlyPayment, calculateTotalFinanceCost } from '@/lib/calculations';
import { DollarSign, Percent, Calendar } from 'lucide-react';

interface FinanceCalculatorProps {
  vehiclePrice: number;
}

export default function FinanceCalculator({ vehiclePrice }: FinanceCalculatorProps) {
  const [downPayment, setDownPayment] = useState(5000);
  const [interestRate, setInterestRate] = useState(5.5);
  const [loanTerm, setLoanTerm] = useState(60);

  const monthlyPayment = calculateMonthlyPayment(vehiclePrice, {
    downPayment,
    interestRate,
    loanTerm,
  });

  const totalCost = calculateTotalFinanceCost(vehiclePrice, {
    downPayment,
    interestRate,
    loanTerm,
  });

  const totalPaid = vehiclePrice + totalCost;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Finance Calculator</h2>
      
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

        {/* Interest Rate */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Annual Interest Rate (%)
          </label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="number"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              min="0"
              max="30"
              step="0.1"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toyota-red focus:border-transparent"
            />
          </div>
        </div>

        {/* Loan Term */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Loan Term (Months)
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-toyota-red focus:border-transparent"
            >
              <option value="36">36 months (3 years)</option>
              <option value="48">48 months (4 years)</option>
              <option value="60">60 months (5 years)</option>
              <option value="72">72 months (6 years)</option>
              <option value="84">84 months (7 years)</option>
            </select>
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
              <p className="text-xs text-gray-600 mb-1">Total Amount Financed</p>
              <p className="text-lg font-semibold text-gray-900">
                ${(vehiclePrice - downPayment).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-600 mb-1">Total Interest</p>
              <p className="text-lg font-semibold text-gray-900">
                ${totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-600 mb-1">Total Amount Paid</p>
              <p className="text-lg font-semibold text-gray-900">
                ${totalPaid.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

