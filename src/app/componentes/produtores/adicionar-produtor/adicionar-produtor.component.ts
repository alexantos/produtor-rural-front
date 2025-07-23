import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-adicionar-produtor',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './adicionar-produtor.component.html',
  styleUrl: './adicionar-produtor.component.scss'
})
export class AdicionarProdutorComponent {

}
