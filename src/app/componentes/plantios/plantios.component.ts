import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdicionarPlantioComponent } from './adicionar-plantio/adicionar-plantio.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
	selector: 'app-plantios',
	standalone: true,
	imports: [MatDialogModule],
	templateUrl: './plantios.component.html',
	styleUrl: './plantios.component.scss'
})
export class PlantiosComponent {
	readonly router = inject(Router);

	readonly dialog = inject(MatDialog);

	readonly activatedRoute = inject(ActivatedRoute);

	readonly propriedade_id = this.activatedRoute.snapshot.paramMap.get('id');

	navega(rota: string, parametro?: string) {
		this.router.navigate([rota, parametro || '']);
	}

	adicionarPlantio() {
		this.dialog.open(AdicionarPlantioComponent, {
			data: {
				propriedade_id: this.propriedade_id,
			},
		});
	}
}
