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



@Component({
	selector: 'app-produtores',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule],
	templateUrl: './produtores.component.html',
	styleUrl: './produtores.component.scss'
})
export class ProdutoresComponent {
	readonly dialog = inject(MatDialog);

	readonly produtorService = inject(ProdutorService);

	produtores: Produtor[] = [];

	constructor(private router: Router) { }

	ngOnInit(): void {
		this.listaProdutores();
	}

	navega(rota: string, parametro?: string) {
		this.router.navigate([rota, parametro || '']);
	}


	listaProdutores() {
		this.produtorService.listar().subscribe({
			next: (resultado: Produtor[]) => {
				this.produtores = resultado;
			}
		})
	}

	adicionarProdutor() {
		this.dialog.open(AdicionarProdutorComponent);
	}
}
