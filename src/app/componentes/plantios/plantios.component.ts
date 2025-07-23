import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-plantios',
	standalone: true,
	imports: [],
	templateUrl: './plantios.component.html',
	styleUrl: './plantios.component.scss'
})
export class PlantiosComponent {
	router = inject(Router)


	navega(rota: string, parametro?: string) {
		this.router.navigate([rota, parametro || '']);
	}
}
