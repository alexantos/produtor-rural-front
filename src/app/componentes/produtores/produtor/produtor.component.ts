import { Component, inject } from '@angular/core';
import { PropriedadesComponent } from "../../propriedades/propriedades.component";


@Component({
	selector: 'app-produtor',
	standalone: true,
	imports: [PropriedadesComponent],
	templateUrl: './produtor.component.html',
	styleUrl: './produtor.component.scss'
})
export class ProdutorComponent {


}
