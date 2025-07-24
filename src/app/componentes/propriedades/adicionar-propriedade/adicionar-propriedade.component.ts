import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PropriedadeService } from '../../../services/propriedade.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Propriedade } from '../../../interfaces/propriedade.interface';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
	selector: 'app-adicionar-propriedade',
	standalone: true,
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		ReactiveFormsModule,
		MatSelectModule,
	],
	templateUrl: './adicionar-propriedade.component.html',
	styleUrl: './adicionar-propriedade.component.scss'
})
export class AdicionarPropriedadeComponent implements OnInit {

	readonly propriedadeService = inject(PropriedadeService);

	readonly activatedRoute = inject(ActivatedRoute);

	data = inject(MAT_DIALOG_DATA);

	produtor_id: string = '';

	propriedade: FormGroup = new FormGroup({
		nome: new FormControl('', []),
		produtor: new FormControl(this.data.produtor_id, []),
		cidade: new FormControl('', []),
		estado: new FormControl('', []),
		area_total_fazenda: new FormControl('', []),
		area_agricultavel: new FormControl('', []),
		area_vegetacao: new FormControl('', []),
	});

	ngOnInit(): void {
		// this.listaProdutores();
		// this.produtor_id = this.activatedRoute.snapshot.paramMap.get('id')
	}

	// listaProdutores() {
	// 	this.produtorService.listar().subscribe({
	// 		next: (resultado: Produtor[]) => {
	// 			this.produtores = resultado;
	// 		}
	// 	})
	// }

	adicionarPropriedade() {
		console.log('Propriedade salvar: ', this.propriedade)
		this.propriedadeService.salvar(this.propriedade.value as any).subscribe({
			next: (resultado: Propriedade) => {
				console.log('Produtor cadastrado: ', resultado)
			}
		})
	}
}
