import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tips-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tips-section.component.html',
  styleUrl: './tips-section.component.css'
})
export class TipsSectionComponent {
tipCategories = [
    {
      category: "Alimentos",
      color: "border-l-green-dark",
      tips: [
        "Planeje suas refeições semanalmente",
        "Armazene frutas e vegetais adequadamente",
        "Use sobras para criar novos pratos",
        "Congele alimentos antes do vencimento"
      ]
    },
    {
      category: "Resíduos",
      color: "border-l-brown-light",
      tips: [
        "Separe materiais recicláveis corretamente",
        "Composte resíduos orgânicos",
        "Reutilize embalagens quando possível",
        "Evite produtos com excesso de embalagem"
      ]
    },
    {
      category: "Água",
      color: "border-l-btn",
      tips: [
        "Tome banhos mais curtos",
        "Feche a torneira ao escovar os dentes",
        "Colete água da chuva para plantas",
        "Conserte vazamentos imediatamente"
      ]
    },
    {
      category: "Energia",
      color: "border-l-secondary",
      tips: [
        "Troque lâmpadas por LED",
        "Desligue aparelhos da tomada",
        "Use luz natural sempre que possível",
        "Invista em eletrodomésticos eficientes"
      ]
    }
  ];
}
