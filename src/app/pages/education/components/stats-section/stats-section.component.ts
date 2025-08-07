import { Component, Input } from '@angular/core';
import { BlogStats } from '../../models/blog-post.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stats-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stats-section.component.html',
  styleUrl: './stats-section.component.css'
})
export class StatsSectionComponent {
@Input() stats: BlogStats | null = null;

  defaultStats = [
    {
      number: "1.3 bilhão",
      label: "Toneladas de alimentos desperdiçados anualmente",
      color: "green-dark"
    },
    {
      number: "2.01 bilhões",
      label: "Toneladas de resíduos sólidos gerados por ano",
      color: "brown-light"
    },
    {
      number: "2.2 bilhões",
      label: "Pessoas sem acesso à água potável",
      color: "btn-color"
    },
    {
      number: "36%",
      label: "Das emissões globais vêm do consumo de energia",
      color: "secondary-color"
    }
  ];
}
