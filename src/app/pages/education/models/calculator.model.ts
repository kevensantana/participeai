export interface CalculatorInput {
  transport: TransportData;
  energy: EnergyData;
  waste: WasteData;
  consumption: ConsumptionData;
}

export interface TransportData {
  carKm: number;
  publicTransportKm: number;
  flightKm: number;
  carType: 'gasoline' | 'diesel' | 'hybrid' | 'electric';
}

export interface EnergyData {
  electricityKwh: number;
  gasM3: number;
  heatingType: 'gas' | 'electric' | 'renewable';
  renewablePercentage: number;
}

export interface WasteData {
  recyclingPercentage: number;
  organicWasteKg: number;
  generalWasteKg: number;
}

export interface ConsumptionData {
  meatMealsPerWeek: number;
  localFoodPercentage: number;
  newClothesPerMonth: number;
  electronicsPerYear: number;
}

export interface CalculatorResult {
  totalCO2: number;
  breakdown: {
    transport: number;
    energy: number;
    waste: number;
    consumption: number;
  };
  level: 'low' | 'medium' | 'high' | 'very-high';
  suggestions: Suggestion[];
  comparison: {
    nationalAverage: number;
    globalAverage: number;
  };
}

export interface Suggestion {
  category: string;
  title: string;
  description: string;
  impact: number;
  difficulty: 'easy' | 'medium' | 'hard';
  icon: string;
}

export interface EmissionFactors {
  transport: {
    car: {
      gasoline: number;
      diesel: number;
      hybrid: number;
      electric: number;
    };
    publicTransport: number;
    flight: number;
  };
  energy: {
    electricity: number;
    gas: number;
  };
  waste: {
    general: number;
    organic: number;
    recycling: number;
  };
  consumption: {
    meat: number;
    clothes: number;
    electronics: number;
    localFood: number;
  };
}

  export interface FoodWasteData {
  totalWasteKg: number;
  foodWasteKg: number;  
  co2Impact: number;
  waterUsageLiters: number;
  }

  export interface FoodWasteImpact {
  co2eKg: number;
  waterLiters: number;
  }
  export interface WaterSavings {
  dailySavingsLiters: number;
  annualSavingsLiters: number;
  }
  export interface EnergyUsageData{
  electricityKwh: number;
  gasM3: number;
  } 
  export interface EnergySavings {
  annualSavingsKwh: number;
  annualSavingsM3: number;
  }