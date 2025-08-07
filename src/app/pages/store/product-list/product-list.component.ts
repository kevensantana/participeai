import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ProductHeaderComponent } from '../../components/product-header/product-header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  produtos: Product[] = [];
  favoritos: Product[] = [];
  produtosFiltrados: Product[] = [];
  qtdCarrinho = 0;
  precoMaximo: number = 100;
  categoriaSelecionada: string = 'all';
  filtroNome: string = '';

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => {
        this.produtos = data;
        this.produtosFiltrados = data;
      },
      error: (err) => console.error('Erro ao carregar produtos', err)
    });

    this.atualizarQtdCarrinho();
  }

  filtrarCategoria(event: Event) {
    const select = event.target as HTMLInputElement;
    this.categoriaSelecionada = select.value;
    this.aplicarFiltros();
  }

  filtrarPorPreco() {
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.produtosFiltrados = this.produtos.filter(produto => {
      const porCategoria = this.categoriaSelecionada === 'all' || produto.category === this.categoriaSelecionada;
      const porPreco = produto.price <= this.precoMaximo;
      const porNome = produto.name.toLowerCase().includes(this.filtroNome.toLowerCase());
      return porCategoria && porPreco && porNome;
    });
  }

  atualizarFiltroNome(nome: string) {
    this.filtroNome = nome;
    this.aplicarFiltros();
  }

  adicionarAoCarrinho(produto: Product): void {
    this.cartService.adicionarAoCarrinho(produto).subscribe({
      next: () => {
        this.atualizarQtdCarrinho();
        alert(`${produto.name} adicionado ao carrinho!`);
      },
      error: () => alert('Erro ao adicionar produto ao carrinho.')
    });
  }

  atualizarQtdCarrinho() {
    this.cartService.listarCarrinho().subscribe(cart => {
      this.qtdCarrinho = cart.reduce((acc, p) => acc + (p.quantity || 1), 0);
    });
  }

  favoritarProduto(produto: Product): void {
    const index = this.favoritos.findIndex(p => p.id === produto.id);
    if (index > -1) {
      this.favoritos.splice(index, 1);
    } else {
      this.favoritos.push(produto);
    }
  }

isFavorito(produto: Product): boolean {
  return this.favoritos.some(p => p.id === produto.id);
}

  abrirCarrinho() {
    console.log('Abrir carrinho');
  }

  abrirFavoritos() {
    console.log('Abrir favoritos');
  }
}
