import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarWasteComponent } from './navbar-waste.component';

describe('NavbarWasteComponent', () => {
  let component: NavbarWasteComponent;
  let fixture: ComponentFixture<NavbarWasteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarWasteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarWasteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
