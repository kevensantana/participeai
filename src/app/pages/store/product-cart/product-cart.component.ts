import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ProductCheckoutComponent } from '../product-checkout/product-checkout.component';
import { ProductHeaderComponent } from '../../components/product-header/product-header.component';


@Component({
  selector: 'app-product-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, ProductHeaderComponent, ProductCheckoutComponent],
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  produtosNoCarrinho: Product[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.carregarCarrinho();
  }

  carregarCarrinho() {
    this.cartService.listarCarrinho().subscribe(cart => {
      this.produtosNoCarrinho = cart.map(produto => {
        if (!produto.quantity || produto.quantity < 1) {
          produto.quantity = 1;
        }
        return produto;
      });
    });
  }

  removerDoCarrinho(id: string) {
    this.cartService.removerDoCarrinho(id).subscribe(() => {
      this.carregarCarrinho();
    });
  }
  verDetalhes(produto: any) {
    alert(`Produto: ${produto.name}\nDescrição: ${produto.description}\nPreço: R$ ${produto.price}`);
  }


  calcularTotal(): number {
    return this.produtosNoCarrinho.reduce((total, p) => total + (p.price * (p.quantity || 1)), 0);
  }

  incrementarQuantidade(produto: Product): void {
    produto.quantity = (produto.quantity || 1) + 1;
    this.cartService.atualizarProdutoNoCarrinho(produto).subscribe();
  }

  decrementarQuantidade(produto: Product): void {
    if ((produto.quantity || 1) > 1) {
      produto.quantity = produto.quantity! - 1;
      this.cartService.atualizarProdutoNoCarrinho(produto).subscribe();
    }
  }
}
