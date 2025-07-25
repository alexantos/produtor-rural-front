import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Propriedade } from '../../interfaces/propriedade.interface';
import { PropriedadeService } from '../../services/propriedade.service';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { AdicionarPropriedadeComponent } from './adicionar-propriedade/adicionar-propriedade.component';
import { HttpParams } from '@angular/common/http';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { ModalConfirmacaoComponent } from '../modal-confirmacao/modal-confirmacao.component';

@Component({
	selector: 'app-propriedades',
	standalone: true,
	imports: [CommonModule, MatIconModule, MatTooltipModule],
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

	modalPropriedade(propriedade?: Propriedade) {
		let dialogRef = this.dialog.open(AdicionarPropriedadeComponent, {
			data: {
				propriedade: propriedade,
				produtor_id: this.produtor_id,
			},
		});
		dialogRef.afterClosed().subscribe((resultado) => {
			this.listaPropriedades();
		});
	}

	deletarPropriedade(propriedade: Propriedade) {
		let dialogRef = this.dialog.open(ModalConfirmacaoComponent, {
			data: {
				mensagem: 'Tem certeza que deseja excluir a propriedade ' + propriedade.nome + ' e todos os seus plantios?'
			},
		});
		dialogRef.afterClosed().subscribe((resultado) => {
			if (resultado) {
				this.propriedadeService.excluir(propriedade.id).subscribe((resultado) => {
					this.listaPropriedades();
				})
			}
		});
	}
}
