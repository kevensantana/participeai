import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WasteHeaderComponent } from './waste-header.component';

describe('WasteHeaderComponent', () => {
  let component: WasteHeaderComponent;
  let fixture: ComponentFixture<WasteHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WasteHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WasteHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
