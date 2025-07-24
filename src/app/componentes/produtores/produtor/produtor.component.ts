import { Component, inject } from '@angular/core';
import { PropriedadesComponent } from "../../propriedades/propriedades.component";
import { AdicionarPropriedadeComponent } from '../../propriedades/adicionar-propriedade/adicionar-propriedade.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-produtor',
	standalone: true,
	imports: [PropriedadesComponent, MatDialogModule],
	templateUrl: './produtor.component.html',
	styleUrl: './produtor.component.scss'
})
export class ProdutorComponent {
	readonly dialog = inject(MatDialog);
	readonly activatedRoute = inject(ActivatedRoute);

	readonly produtor_id = this.activatedRoute.snapshot.paramMap.get('id');

	adicionarPropriedade() {
		this.dialog.open(AdicionarPropriedadeComponent, {
			data: {
				produtor_id: this.produtor_id,
			},
		});
	}
}
