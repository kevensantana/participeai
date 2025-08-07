import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CalculatorResult, CalculatorInput } from '../../models/calculator.model';
import { CalculatorService } from '../../service/calculator.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
   calculatorForm: FormGroup;
  result: CalculatorResult | null = null;
  isCalculating = false;

  constructor(
    private fb: FormBuilder,
    private calculatorService: CalculatorService
  ) {
    this.calculatorForm = this.fb.group({
      // Transport
      carKm: [10, [Validators.required, Validators.min(0), Validators.max(200)]],
      publicTransportKm: [5, [Validators.required, Validators.min(0), Validators.max(100)]],
      flightKm: [2000, [Validators.required, Validators.min(0), Validators.max(50000)]],
      carType: ['gasoline', Validators.required],
      
      // Energy
      electricityKwh: [300, [Validators.required, Validators.min(0), Validators.max(2000)]],
      gasM3: [50, [Validators.required, Validators.min(0), Validators.max(500)]],
      heatingType: ['gas', Validators.required],
      renewablePercentage: [20, [Validators.required, Validators.min(0), Validators.max(100)]],
      
      // Waste
      recyclingPercentage: [30, [Validators.required, Validators.min(0), Validators.max(100)]],
      organicWasteKg: [3, [Validators.required, Validators.min(0), Validators.max(20)]],
      generalWasteKg: [5, [Validators.required, Validators.min(0), Validators.max(50)]],
      
      // Consumption
      meatMealsPerWeek: [7, [Validators.required, Validators.min(0), Validators.max(21)]],
      localFoodPercentage: [40, [Validators.required, Validators.min(0), Validators.max(100)]],
      newClothesPerMonth: [2, [Validators.required, Validators.min(0), Validators.max(20)]],
      electronicsPerYear: [1, [Validators.required, Validators.min(0), Validators.max(10)]]
    });
  }

  ngOnInit(): void {
  }

  onCalculate(): void {
    if (this.calculatorForm.valid) {
      this.isCalculating = true;
      const formValue = this.calculatorForm.value;
      
      const input: CalculatorInput = {
        transport: {
          carKm: formValue.carKm,
          publicTransportKm: formValue.publicTransportKm,
          flightKm: formValue.flightKm,
          carType: formValue.carType
        },
        energy: {
          electricityKwh: formValue.electricityKwh,
          gasM3: formValue.gasM3,
          heatingType: formValue.heatingType,
          renewablePercentage: formValue.renewablePercentage
        },
        waste: {
          recyclingPercentage: formValue.recyclingPercentage,
          organicWasteKg: formValue.organicWasteKg,
          generalWasteKg: formValue.generalWasteKg
        },
        consumption: {
          meatMealsPerWeek: formValue.meatMealsPerWeek,
          localFoodPercentage: formValue.localFoodPercentage,
          newClothesPerMonth: formValue.newClothesPerMonth,
          electronicsPerYear: formValue.electronicsPerYear
        }
      };

      // this.calculatorService.calculateFootprint(input).subscribe(
      //   result => {
      //     this.result = result;
      //     this.isCalculating = false;
      //   },
      //   error => {
      //     console.error('Erro no cálculo:', error);
      //     this.isCalculating = false;
      //   }
      // );
    }
  }

  onReset(): void {
    this.calculatorForm.reset();
    this.result = null;
  }

  getLevelColor(level: string): string {
    switch (level) {
      case 'low': return '#4CAF50';
      case 'medium': return '#FF9800';
      case 'high': return '#F44336';
      case 'very-high': return '#D32F2F';
      default: return '#6B7280';
    }
  }

  getLevelText(level: string): string {
    switch (level) {
      case 'low': return 'Baixo';
      case 'medium': return 'Médio';
      case 'high': return 'Alto';
      case 'very-high': return 'Muito Alto';
      default: return 'Desconhecido';
    }
  }

  getProgressPercentage(value: number, max: number): number {
    return Math.min((value / max) * 100, 100);
  }
}
