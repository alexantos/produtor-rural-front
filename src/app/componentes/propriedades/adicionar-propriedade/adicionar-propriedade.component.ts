import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-adicionar-propriedade',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule],
  templateUrl: './adicionar-propriedade.component.html',
  styleUrl: './adicionar-propriedade.component.scss'
})
export class AdicionarPropriedadeComponent {

}
