import { Component } from '@angular/core';
import { ProdutorService } from '../../services/produtor.service';

@Component({
	selector: 'app-inicio',
	standalone: true,
	imports: [],
	templateUrl: './inicio.component.html',
	styleUrl: './inicio.component.scss'
})
export class InicioComponent {

	constructor(private produtorService: ProdutorService){
		this.produtorService.listar().subscribe((resultado) => {
			console.log('Produtores: ', resultado);
		})
	}

}
