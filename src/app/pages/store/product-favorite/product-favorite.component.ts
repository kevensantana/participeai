import { Component } from '@angular/core';
import { ProductHeaderComponent } from '../../components/product-header/product-header.component';


@Component({
  selector: 'app-product-favorite',
  standalone: true,
  imports: [ProductHeaderComponent],
  templateUrl: './product-favorite.component.html',
  styleUrl: './product-favorite.component.css'
})
export class ProductFavoriteComponent {

}
