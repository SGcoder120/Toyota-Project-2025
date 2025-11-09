export interface Vehicle {
  id: string;
  model: string;
  year: number;
  trim: string;
  price: number;
  msrp: number;
  image: string;
  fuelType: 'Gasoline' | 'Hybrid' | 'Electric' | 'Plug-in Hybrid';
  drivetrain: 'FWD' | 'RWD' | 'AWD';
  engine: string;
  horsepower: number;
  mpg: {
    city: number;
    highway: number;
  };
  seating: number;
  features: string[];
  description: string;
  category: 'Sedan' | 'SUV' | 'Truck' | 'Van' | 'Coupe';
}

export interface FinanceOptions {
  downPayment: number;
  interestRate: number;
  loanTerm: number; // in months
}

export interface LeaseOptions {
  downPayment: number;
  moneyFactor: number;
  leaseTerm: number; // in months
  residualValue: number; // percentage
}

export interface FilterPreferences {
  minPrice?: number;
  maxPrice?: number;
  fuelType?: Vehicle['fuelType'];
  drivetrain?: Vehicle['drivetrain'];
  category?: Vehicle['category'];
  minMpg?: number;
  searchQuery?: string;
}

