import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AdicionarProdutorComponent } from './adicionar-produtor/adicionar-produtor.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProdutorService } from '../../services/produtor.service';
import { Produtor } from '../../interfaces/produtor.interface';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { MetodosEstaticos } from '../../utils';



@Component({
	selector: 'app-produtores',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatIconModule, MatDialogModule],
	templateUrl: './produtores.component.html',
	styleUrl: './produtores.component.scss'
})
export class ProdutoresComponent {
	readonly dialog = inject(MatDialog);

	readonly produtorService = inject(ProdutorService);

	produtores: Produtor[] = [];

	pesquisar: FormControl = new FormControl();

	metodosEstaticos = MetodosEstaticos;

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.listaProdutores();
		this.pesquisar.valueChanges.pipe(debounceTime(1000), distinctUntilChanged())
			.subscribe((filtro) => {
				this.listaProdutores(filtro);
			});
	}

	navega(rota: string, parametro?: string) {
		this.router.navigate([rota, parametro || '']);
	}


	listaProdutores(pesquisa: string = '') {
		let params: HttpParams = new HttpParams().set('nome', pesquisa)
		this.produtorService.listar(params).subscribe({
			next: (resultado: Produtor[]) => {
				this.produtores = resultado;
			}
		})
	}

	adicionarProdutor() {
		let dialogRef = this.dialog.open(AdicionarProdutorComponent);
		dialogRef.afterClosed().subscribe((resultado) => {
			this.listaProdutores();
		});
	}


}
