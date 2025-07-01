import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductFavoriteComponent } from './product-favorite.component';

describe('ProductFavoriteComponent', () => {
  let component: ProductFavoriteComponent;
  let fixture: ComponentFixture<ProductFavoriteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductFavoriteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductFavoriteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
