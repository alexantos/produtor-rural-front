import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantiosComponent } from './plantios.component';

describe('PlantiosComponent', () => {
  let component: PlantiosComponent;
  let fixture: ComponentFixture<PlantiosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlantiosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlantiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
