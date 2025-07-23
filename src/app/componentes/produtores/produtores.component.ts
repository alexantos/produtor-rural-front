import { Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { AdicionarProdutorComponent } from './adicionar-produtor/adicionar-produtor.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';



@Component({
	selector: 'app-produtores',
	standalone: true,
	imports: [MatFormFieldModule, MatInputModule, MatIconModule, MatDialogModule],
	templateUrl: './produtores.component.html',
	styleUrl: './produtores.component.scss'
})
export class ProdutoresComponent {
	readonly dialog = inject(MatDialog);


	constructor(private router: Router) { }

	navega(rota: string, parametro?: string) {
		this.router.navigate([rota, parametro || '']);
	}


	adicionarProdutor() {
		this.dialog.open(AdicionarProdutorComponent);
	}
}
