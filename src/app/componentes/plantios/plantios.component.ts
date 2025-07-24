import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdicionarPlantioComponent } from './adicionar-plantio/adicionar-plantio.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PlantioService } from '../../services/plantio.service';
import { Plantio } from '../../interfaces/plantio.interface';
import { CommonModule } from '@angular/common';
import { HttpParams } from '@angular/common/http';

@Component({
	selector: 'app-plantios',
	standalone: true,
	imports: [CommonModule, MatDialogModule],
	templateUrl: './plantios.component.html',
	styleUrl: './plantios.component.scss'
})
export class PlantiosComponent implements OnInit {
	readonly router = inject(Router);

	readonly dialog = inject(MatDialog);

	readonly activatedRoute = inject(ActivatedRoute);

	readonly plantioService = inject(PlantioService);

	readonly propriedade_id = this.activatedRoute.snapshot.paramMap.get('id');

	plantios: Plantio[] = [];

	ngOnInit(): void {
		this.listaPlantios();
	}

	navega(rota: string, parametro?: string) {
		this.router.navigate([rota, parametro || '']);
	}

	listaPlantios() {
		let params: HttpParams = new HttpParams().set('propriedade__id', this.propriedade_id as string);
		this.plantioService.listar(params).subscribe({
			next: (resultado: Plantio[]) => {
				this.plantios = resultado;
			}
		})
	}

	adicionarPlantio() {
		let dialogRef = this.dialog.open(AdicionarPlantioComponent, {
			data: {
				propriedade_id: this.propriedade_id,
			},
		});
		dialogRef.afterClosed().subscribe((resultado) => {
			//Recarrega plantios
		})
	}
}
