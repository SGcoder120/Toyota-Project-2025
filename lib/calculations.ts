import { FinanceOptions, LeaseOptions } from './types';

export function calculateMonthlyPayment(
  vehiclePrice: number,
  options: FinanceOptions
): number {
  const principal = vehiclePrice - options.downPayment;
  const monthlyRate = options.interestRate / 100 / 12;
  const numPayments = options.loanTerm;
  
  if (monthlyRate === 0) {
    return principal / numPayments;
  }
  
  const monthlyPayment =
    (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);
  
  return Math.round(monthlyPayment * 100) / 100;
}

export function calculateLeasePayment(
  vehiclePrice: number,
  options: LeaseOptions
): number {
  const capitalizedCost = vehiclePrice - options.downPayment;
  const residualValue = vehiclePrice * (options.residualValue / 100);
  const depreciation = capitalizedCost - residualValue;
  const baseMonthlyPayment = depreciation / options.leaseTerm;
  
  const rentCharge = (capitalizedCost + residualValue) * options.moneyFactor;
  const totalMonthlyPayment = baseMonthlyPayment + rentCharge;
  
  return Math.round(totalMonthlyPayment * 100) / 100;
}

export function calculateTotalFinanceCost(
  vehiclePrice: number,
  options: FinanceOptions
): number {
  const monthlyPayment = calculateMonthlyPayment(vehiclePrice, options);
  const totalPaid = monthlyPayment * options.loanTerm + options.downPayment;
  return totalPaid - vehiclePrice;
}

export function calculateTotalLeaseCost(
  vehiclePrice: number,
  options: LeaseOptions
): number {
  const monthlyPayment = calculateLeasePayment(vehiclePrice, options);
  const totalPaid = monthlyPayment * options.leaseTerm + options.downPayment;
  return totalPaid;
}

