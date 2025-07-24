import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProdutorService } from '../../../services/produtor.service';
import { Produtor } from '../../../interfaces/produtor.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
	selector: 'app-adicionar-produtor',
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule],
	templateUrl: './adicionar-produtor.component.html',
	styleUrl: './adicionar-produtor.component.scss'
})
export class AdicionarProdutorComponent {
	readonly produtorService = inject(ProdutorService);

	produtor: FormGroup = new FormGroup({
		nome: new FormControl('', []),
		cpf_cnpj: new FormControl('', []),
	});

	adicionarProdutor() {
		this.produtorService.salvar(this.produtor.value as any).subscribe({
			next: (resultado: Produtor) => {
				console.log('Produtor cadastrado: ', resultado)
			}
		})
	}
}
