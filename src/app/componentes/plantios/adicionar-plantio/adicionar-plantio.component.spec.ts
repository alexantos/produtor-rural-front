import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarPlantioComponent } from './adicionar-plantio.component';

describe('AdicionarPlantioComponent', () => {
  let component: AdicionarPlantioComponent;
  let fixture: ComponentFixture<AdicionarPlantioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarPlantioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarPlantioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
