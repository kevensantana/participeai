import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly apiUrl = `${environment.apiBaseUrl}/cart`;
  private cartSubject = new BehaviorSubject<Product[]>([]);
  cart$ = this.cartSubject.asObservable();

  private totalQuantidadeSubject = new BehaviorSubject<number>(0);
  totalQuantidade$ = this.totalQuantidadeSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadCart();
  }

  private loadCart() {
    this.listarCarrinho().subscribe(cart => {
      this.cartSubject.next(cart);
      this.atualizarQuantidadeTotal(cart);
    });
  }

  listarCarrinho(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  adicionarAoCarrinho(produto: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, produto).pipe(
      tap(() => this.loadCart())
    );
  }

  removerDoCarrinho(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`).pipe(
      tap(() => this.loadCart())
    );
  }

  limparCarrinho(): Observable<any> {
    return this.http.delete(this.apiUrl).pipe(
      tap(() => this.cartSubject.next([]))
    );
  }

  getItem(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  private atualizarQuantidadeTotal(produtos: Product[]) {
    const total = produtos.reduce((acc, p) => acc + (p.quantity || 1), 0);
    this.totalQuantidadeSubject.next(total);
  }

  atualizarProdutoNoCarrinho(produto: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiUrl}/${produto.id}`, produto).pipe(
      tap(() => this.loadCart())
    );
  }
}


