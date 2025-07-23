import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarPropriedadeComponent } from './adicionar-propriedade.component';

describe('AdicionarPropriedadeComponent', () => {
  let component: AdicionarPropriedadeComponent;
  let fixture: ComponentFixture<AdicionarPropriedadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarPropriedadeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarPropriedadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
