import { Injectable } from '@angular/core';
import { 
  CalculatorInput,
  CalculatorResult,
  Suggestion
} from '../models/calculator.model';
import { Observable, of, delay } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {
  [x: string]: any;

  private readonly EMISSION_FACTORS = {
    transport: {
      car: {
        gasoline: 0.21, // kg CO2/km
        diesel: 0.18,
        hybrid: 0.12,
        electric: 0.05
      },
      publicTransport: 0.08, // kg CO2/km
      flight: 0.25 // kg CO2/km
    },
    energy: {
      electricity: 0.5, // kg CO2/kWh (média Brasil)
      gas: 2.0, // kg CO2/m³
      renewable: 0.02 // kg CO2/kWh
    },
    waste: {
      general: 0.5, // kg CO2/kg
      organic: 0.3, // kg CO2/kg
      recycling: -0.2 // kg CO2/kg (economia)
    },
    consumption: {
      meat: 6.0, // kg CO2/refeição
      localFood: -0.5, // kg CO2/% (economia)
      clothes: 10.0, // kg CO2/peça
      electronics: 300.0 // kg CO2/item
    }
  };

  private readonly SUGGESTIONS: Suggestion[] = [
    {
      category: 'transport',
      title: 'Use transporte público',
      description: 'Substitua viagens de carro por transporte público quando possível',
      impact: 2.5,
      difficulty: 'easy',
      icon: '🚌'
    },
    {
      category: 'transport',
      title: 'Considere um veículo híbrido',
      description: 'Veículos híbridos reduzem significativamente as emissões',
      impact: 4.0,
      difficulty: 'hard',
      icon: '🚗'
    },
    {
      category: 'energy',
      title: 'Instale painéis solares',
      description: 'Energia solar pode reduzir drasticamente sua pegada energética',
      impact: 5.0,
      difficulty: 'hard',
      icon: '☀️'
    },
    {
      category: 'energy',
      title: 'Use lâmpadas LED',
      description: 'LEDs consomem até 80% menos energia que lâmpadas incandescentes',
      impact: 1.5,
      difficulty: 'easy',
      icon: '💡'
    },
    {
      category: 'waste',
      title: 'Aumente a reciclagem',
      description: 'Recicle mais materiais para reduzir emissões de resíduos',
      impact: 2.0,
      difficulty: 'easy',
      icon: '♻️'
    },
    {
      category: 'waste',
      title: 'Faça compostagem',
      description: 'Composte restos orgânicos para reduzir metano em aterros',
      impact: 1.8,
      difficulty: 'medium',
      icon: '🌱'
    },
    {
      category: 'consumption',
      title: 'Reduza o consumo de carne',
      description: 'Diminua refeições com carne para reduzir emissões da pecuária',
      impact: 3.0,
      difficulty: 'medium',
      icon: '🥗'
    },
    {
      category: 'consumption',
      title: 'Compre produtos locais',
      description: 'Produtos locais têm menor pegada de transporte',
      impact: 1.2,
      difficulty: 'easy',
      icon: '🏪'
    }
  ];



  private performCalculation(input: CalculatorInput): CalculatorResult {
    const transportEmissions = this.calculateTransportEmissions(input.transport);
    const energyEmissions = this.calculateEnergyEmissions(input.energy);
    const wasteEmissions = this.calculateWasteEmissions(input.waste);
    const consumptionEmissions = this.calculateConsumptionEmissions(input.consumption);

    const totalCO2 = transportEmissions + energyEmissions + wasteEmissions + consumptionEmissions;

    return {
      totalCO2: Math.round(totalCO2 * 100) / 100,
      breakdown: {
        transport: Math.round(transportEmissions * 100) / 100,
        energy: Math.round(energyEmissions * 100) / 100,
        waste: Math.round(wasteEmissions * 100) / 100,
        consumption: Math.round(consumptionEmissions * 100) / 100
      },
      level: this.determineLevel(totalCO2),
      suggestions: this.getSuggestions(input, totalCO2),
      comparison: {
        nationalAverage: 2300, // kg CO2/ano (média brasileira)
        globalAverage: 4800 // kg CO2/ano (média global)
      }
    };
  }

  private calculateTransportEmissions(transport: { 
    carKm: number; 
    carType: 'gasoline' | 'diesel' | 'hybrid' | 'electric'; 
    publicTransportKm: number; 
    flightKm: number; 
  }): number {
    const carEmissions = transport.carKm * this.EMISSION_FACTORS.transport.car[transport.carType] * 365;
    const publicTransportEmissions = transport.publicTransportKm * this.EMISSION_FACTORS.transport.publicTransport * 365;
    const flightEmissions = transport.flightKm * this.EMISSION_FACTORS.transport.flight;

    return carEmissions + publicTransportEmissions + flightEmissions;
  }

  private calculateEnergyEmissions(energy: any): number {
    const electricityEmissions = energy.electricityKwh * this.EMISSION_FACTORS.energy.electricity * 12;
    const gasEmissions = energy.gasM3 * this.EMISSION_FACTORS.energy.gas * 12;
    const renewableReduction = (energy.renewablePercentage / 100) * electricityEmissions * 0.9;

    return electricityEmissions + gasEmissions - renewableReduction;
  }

  private calculateWasteEmissions(waste: any): number {
    const generalWasteEmissions = waste.generalWasteKg * this.EMISSION_FACTORS.waste.general * 52;
    const organicWasteEmissions = waste.organicWasteKg * this.EMISSION_FACTORS.waste.organic * 52;
    const recyclingReduction = (waste.recyclingPercentage / 100) * generalWasteEmissions * Math.abs(this.EMISSION_FACTORS.waste.recycling);

    return generalWasteEmissions + organicWasteEmissions - recyclingReduction;
  }

  private calculateConsumptionEmissions(consumption: any): number {
    const meatEmissions = consumption.meatMealsPerWeek * this.EMISSION_FACTORS.consumption.meat * 52;
    const clothesEmissions = consumption.newClothesPerMonth * this.EMISSION_FACTORS.consumption.clothes * 12;
    const electronicsEmissions = consumption.electronicsPerYear * this.EMISSION_FACTORS.consumption.electronics;
    const localFoodReduction = (consumption.localFoodPercentage / 100) * Math.abs(this.EMISSION_FACTORS.consumption.localFood) * 365;

    return meatEmissions + clothesEmissions + electronicsEmissions - localFoodReduction;
  }

  private determineLevel(totalCO2: number): 'low' | 'medium' | 'high' | 'very-high' {
    if (totalCO2 < 1500) return 'low';
    if (totalCO2 < 3000) return 'medium';
    if (totalCO2 < 5000) return 'high';
    return 'very-high';
  }

  private getSuggestions(input: CalculatorInput, totalCO2: number): Suggestion[] {
    const suggestions: Suggestion[] = [];

    // Sugestões baseadas no transporte
    if (input.transport.carKm > 20) {
      suggestions.push(this.SUGGESTIONS.find(s => s.title === 'Use transporte público')!);
    }
    if (input.transport.carType === 'gasoline' || input.transport.carType === 'diesel') {
      suggestions.push(this.SUGGESTIONS.find(s => s.title === 'Considere um veículo híbrido')!);
    }

    // Sugestões baseadas na energia
    if (input.energy.electricityKwh > 300) {
      suggestions.push(this.SUGGESTIONS.find(s => s.title === 'Use lâmpadas LED')!);
    }
    if (input.energy.renewablePercentage < 30) {
      suggestions.push(this.SUGGESTIONS.find(s => s.title === 'Instale painéis solares')!);
    }

    // Sugestões baseadas nos resíduos
    if (input.waste.recyclingPercentage < 50) {
      suggestions.push(this.SUGGESTIONS.find(s => s.title === 'Aumente a reciclagem')!);
    }
    if (input.waste.organicWasteKg > 2) {
      suggestions.push(this.SUGGESTIONS.find(s => s.title === 'Faça compostagem')!);
    }

    // Sugestões baseadas no consumo
    if (input.consumption.meatMealsPerWeek > 7) {
      suggestions.push(this.SUGGESTIONS.find(s => s.title === 'Reduza o consumo de carne')!);
    }
    if (input.consumption.localFoodPercentage < 50) {
      suggestions.push(this.SUGGESTIONS.find(s => s.title === 'Compre produtos locais')!);
    }

    return suggestions.slice(0, 5); // Retorna no máximo 5 sugestões
  }
}