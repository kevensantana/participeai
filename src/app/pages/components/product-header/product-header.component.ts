import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartService } from '../../store/services/cart.service';


@Component({
  selector: 'app-product-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './product-header.component.html',
  styleUrl: './product-header.component.css'
})
export class ProductHeaderComponent {
  @Output() filtroNomeChange = new EventEmitter<string>();
  @Input() totalItensCarrinho: number = 0;

  quantidadeCarrinho: number = 0;

  constructor(private cartService: CartService) {}

  onPesquisar(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.filtroNomeChange.emit(valor);
  }

  ngOnInit(): void {
    this.cartService.totalQuantidade$.subscribe(qtd => {
      this.quantidadeCarrinho = qtd;
    });
  }
}
