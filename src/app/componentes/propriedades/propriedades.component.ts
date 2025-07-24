import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Propriedade } from '../../interfaces/propriedade.interface';
import { PropriedadeService } from '../../services/propriedade.service';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'app-propriedades',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './propriedades.component.html',
	styleUrl: './propriedades.component.scss'
})
export class PropriedadesComponent {

	router = inject(Router)

	readonly propriedadeService = inject(PropriedadeService);

	propriedades: Propriedade[] = [];


	ngOnInit(): void {
		this.listaPropriedades();
	}

	navega(rota: string, parametro?: string) {
		this.router.navigate([rota, parametro || '']);
	}


	listaPropriedades() {
		this.propriedadeService.listar().subscribe({
			next: (resultado: Propriedade[]) => {
				this.propriedades = resultado;
			}
		})
	}



}
