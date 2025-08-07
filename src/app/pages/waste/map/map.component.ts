import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as L from 'leaflet';
import { Ponto, PontosService } from '../../../services/pontos.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  private marcadores: L.Marker[] = [];

  pontos: Ponto[] = [];

  constructor(private pontosService: PontosService) {}

  searchTerm = '';
  tipos = [
    { nome: 'Coleta Seletiva', cor: 'green', checked: true },
    { nome: 'Eletrônicos', cor: 'blue', checked: true },
    { nome: 'Óleo de Cozinha', cor: 'orange', checked: true },
    { nome: 'Pilhas e Baterias', cor: 'red', checked: true },
    { nome: 'Medicamentos', cor: 'purple', checked: true },
    { nome: 'Orgânicos', cor: 'brown', checked: true },
  ];

  zoom = 13;
  

  inicializarMapa() {
    this.map = L.map('map').setView([-12.97, -38.51], 13);
    L.tileLayer('...').addTo(this.map);
  }

  ngAfterViewInit(): void {
    this.initMap();
    this.pontosService.getPontos().subscribe(pontos => {
      this.pontos = pontos;
      this.renderizarPontos();
    });
  } 
  get pontosFiltrados() {
    const tiposAtivos = this.tipos.filter(t => t.checked).map(t => t.nome);
    return this.pontos.filter(p => tiposAtivos.includes(p.tipo));
  }


  getIconColor(tipo: string): string {
    return this.tipos.find(t => t.nome === tipo)?.cor || 'gray';
  }

  private initMap(): void {
    this.map = L.map('map').setView([-12.9692, -38.5078], this.zoom);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    // attribution: '&copy; OpenStreetMap &copy; CARTO'
  }).addTo(this.map);


  // // Sobreposição só com labels (bairros, ruas, etc)
  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
    attribution: ''
  }).addTo(this.map);
  
  
  // MAPA PADRÂO
  // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //    maxZoom: 19,
  //   attribution: '&copy; OpenStreetMap contributors'
  // }).addTo(this.map);
  }


  private renderizarPontos(): void {
    this.marcadores.forEach(m => this.map.removeLayer(m));
    this.marcadores = [];

    this.pontosFiltrados.forEach(ponto => {
      const cor = this.getIconColor(ponto.tipo);

     const icon = L.divIcon({
      className: 'custom-icon',
      html: `<div style="width:16px; height:16px; border-radius:50%; background-color:${cor}; border: 2px solid white;"></div>`,
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -10]
    });


      const marcador = L.marker([ponto.lat, ponto.lng], { icon })
        .addTo(this.map)
        .bindPopup(`<strong>${ponto.nome}</strong><br>${ponto.tipo}`);

      this.marcadores.push(marcador);
    });
  }

  zoomIn() {
    this.zoom++;
    this.map.setZoom(this.zoom);
  }

  zoomOut() {
    this.zoom--;
    this.map.setZoom(this.zoom);
  }

  onFiltroChange() {
    this.renderizarPontos();
  }
}
