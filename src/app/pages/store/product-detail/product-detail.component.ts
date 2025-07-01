import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../models/product.model';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  produto?: Product;
  carregando = true;  // adiciona isso

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.productService.getProductById(id).subscribe({
        next: (p) => {
          this.produto = p;
          this.carregando = false; // carrega completo
        },
        error: () => {
          this.produto = undefined;
          this.carregando = false; // erro, mas finaliza carregamento
        }
      });
    } else {
      this.carregando = false; // sem id, já finaliza carregamento
    }
  }
  getRate(): number {
    return this.produto?.rating?.rate ?? 0;
  }
}
