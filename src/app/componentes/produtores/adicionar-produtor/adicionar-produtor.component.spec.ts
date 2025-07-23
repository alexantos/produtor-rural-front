import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdicionarProdutorComponent } from './adicionar-produtor.component';

describe('AdicionarProdutorComponent', () => {
  let component: AdicionarProdutorComponent;
  let fixture: ComponentFixture<AdicionarProdutorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdicionarProdutorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdicionarProdutorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
