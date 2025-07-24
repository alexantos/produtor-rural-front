import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Propriedade } from '../../interfaces/propriedade.interface';
import { PropriedadeService } from '../../services/propriedade.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AdicionarPropriedadeComponent } from './adicionar-propriedade/adicionar-propriedade.component';
import { HttpParams } from '@angular/common/http';

@Component({
	selector: 'app-propriedades',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './propriedades.component.html',
	styleUrl: './propriedades.component.scss'
})
export class PropriedadesComponent {

	router = inject(Router)

	readonly dialog = inject(MatDialog);

	readonly activatedRoute = inject(ActivatedRoute);

	readonly produtor_id = this.activatedRoute.snapshot.paramMap.get('id');

	readonly propriedadeService = inject(PropriedadeService);

	propriedades: Propriedade[] = [];


	ngOnInit(): void {
		this.listaPropriedades();
	}

	navega(rota: string, parametro?: string) {
		this.router.navigate([rota, parametro || '']);
	}


	listaPropriedades() {
		let params: HttpParams = new HttpParams().set('produtor__id', this.produtor_id as string);
		this.propriedadeService.listar(params).subscribe({
			next: (resultado: Propriedade[]) => {
				this.propriedades = resultado;
			}
		})
	}


	adicionarPropriedade() {
		this.dialog.open(AdicionarPropriedadeComponent, {
			data: {
				produtor_id: this.produtor_id,
			},
		});
	}
}
