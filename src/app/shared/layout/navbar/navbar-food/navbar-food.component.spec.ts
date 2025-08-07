import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarFoodComponent } from './navbar-food.component';

describe('NavbarFoodComponent', () => {
  let component: NavbarFoodComponent;
  let fixture: ComponentFixture<NavbarFoodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarFoodComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarFoodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
