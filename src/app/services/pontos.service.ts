import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Ponto {
  nome: string;
  tipo: string;
  lat: number;
  lng: number;
  distancia?: number;
}

@Injectable({ providedIn: 'root' })
export class PontosService {
  private pontos: Ponto[] = [
  { nome: 'Ecoponto Barra', tipo: 'Coleta Seletiva', lat: -12.9784, lng: -38.5039, distancia: 1.0 },
  { nome: 'Ponto Cajazeiras', tipo: 'Eletrônicos', lat: -12.9200, lng: -38.4300, distancia: 2.5 },
  { nome: 'Coleta de Óleo Federação', tipo: 'Óleo de Cozinha', lat: -12.9972, lng: -38.4890, distancia: 1.8 },
  { nome: 'Ponto Pituba', tipo: 'Pilhas e Baterias', lat: -12.9714, lng: -38.4387, distancia: 3.2 },
  { nome: 'Medicamentos Ondina', tipo: 'Medicamentos', lat: -12.9706, lng: -38.4986, distancia: 1.4 },
  { nome: 'Orgânicos Rio Vermelho', tipo: 'Orgânicos', lat: -12.9674, lng: -38.4686, distancia: 2.0 },

  // Pontos adicionais
  { nome: 'Ecoponto Itapuã', tipo: 'Coleta Seletiva', lat: -12.9250, lng: -38.4305, distancia: 4.0 },
  { nome: 'Ponto Eletrônicos Brotas', tipo: 'Eletrônicos', lat: -12.9985, lng: -38.5200, distancia: 2.8 },
  { nome: 'Coleta Óleo Pituba', tipo: 'Óleo de Cozinha', lat: -12.9730, lng: -38.4400, distancia: 3.1 },
  { nome: 'Ponto Pilhas Amaralina', tipo: 'Pilhas e Baterias', lat: -12.9600, lng: -38.4800, distancia: 2.7 },
  { nome: 'Medicamentos Stella Maris', tipo: 'Medicamentos', lat: -12.9650, lng: -38.5000, distancia: 3.4 },
  { nome: 'Orgânicos Garcia', tipo: 'Orgânicos', lat: -12.9980, lng: -38.5100, distancia: 3.9 },
];

  getPontos(): Observable<Ponto[]> {
    return of(this.pontos);
  }
}
