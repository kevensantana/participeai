import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-product-add',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  produto: Omit<Product, 'id'> = {
    name: '',
    price: 0,
    quantity: 1,
    description: '',
    imageUrl: '',
    category: '',
    featured: false
  };

  constructor(
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {}

  onSubmit() {
    this.productService.addProduct(this.produto).subscribe({
      next: () => {
        this.snackBar.open('Produto adicionado com sucesso!', 'Fechar', { duration: 3000 });
        this.resetForm();
      },
      error: () => {
        this.snackBar.open('Erro ao adicionar produto.', 'Fechar', { duration: 3000 });
      }
    });
  }


  resetForm() {
    this.produto = {
      name: '',
      price: 0,
      quantity: 1,
      description: '',
      imageUrl: '',
      category: '',
      featured: false
    };
  }
}
