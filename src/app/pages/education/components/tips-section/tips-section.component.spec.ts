import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipsSectionComponent } from './tips-section.component';

describe('TipsSectionComponent', () => {
  let component: TipsSectionComponent;
  let fixture: ComponentFixture<TipsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TipsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TipsSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
