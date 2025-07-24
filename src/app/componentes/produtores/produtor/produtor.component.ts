import { Component, inject, OnInit } from '@angular/core';
import { PropriedadesComponent } from "../../propriedades/propriedades.component";
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ProdutorService } from '../../../services/produtor.service';
import { MatIconModule } from '@angular/material/icon';
import { Produtor } from '../../../interfaces/produtor.interface';

@Component({
	selector: 'app-produtor',
	standalone: true,
	imports: [PropriedadesComponent, MatDialogModule, MatIconModule],
	templateUrl: './produtor.component.html',
	styleUrl: './produtor.component.scss'
})
export class ProdutorComponent implements OnInit {
	readonly produtorService: ProdutorService = inject(ProdutorService);
	readonly activatedRoute = inject(ActivatedRoute);

	readonly produtor_id = this.activatedRoute.snapshot.paramMap.get('id');

	cards: any = {};
	produtor: Produtor | null = null;
	ngOnInit(): void {
		this.produtorService.cardsProdutor(this.produtor_id as string).subscribe((resultado) => {
			console.log('Resultado: ', resultado);
			this.cards = resultado;
		});
		this.produtorService.pegarId(this.produtor_id).subscribe((resultado) => {
			this.produtor = resultado;
		})
	}
}
