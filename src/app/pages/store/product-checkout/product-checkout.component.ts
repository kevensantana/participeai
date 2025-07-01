import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-checkout.component.html',
  styleUrls: ['./product-checkout.component.css']
})
export class ProductCheckoutComponent implements OnInit {
  produtosNoCarrinho: Product[] = [];
  formaPagamento: string = '';

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit() {
    this.carregarCarrinho();
  }

  carregarCarrinho() {
    this.cartService.listarCarrinho().subscribe(cart => {
      this.produtosNoCarrinho = cart;
    });
  }

  calcularTotal(): number {
    return this.produtosNoCarrinho.reduce(
      (total, p) => total + p.price * (p.quantity || 1),
      0
    );
  }
  

  finalizarCompra() {
    alert('Compra finalizada com sucesso!');
    this.cartService.limparCarrinho().subscribe(() => {
      this.router.navigate(['/store']);
    });
  }
}
