import { Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { PropriedadeService } from '../../../services/propriedade.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Propriedade } from '../../../interfaces/propriedade.interface';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NgxCurrencyDirective } from "ngx-currency";


@Component({
	selector: 'app-adicionar-propriedade',
	standalone: true,
	imports: [
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		ReactiveFormsModule,
		MatSelectModule,
		NgxCurrencyDirective
	],
	templateUrl: './adicionar-propriedade.component.html',
	styleUrl: './adicionar-propriedade.component.scss'
})
export class AdicionarPropriedadeComponent implements OnInit {

	readonly dialogRef = inject(MatDialogRef<AdicionarPropriedadeComponent>);

	readonly propriedadeService = inject(PropriedadeService);

	readonly activatedRoute = inject(ActivatedRoute);

	data = inject(MAT_DIALOG_DATA);

	produtor_id: string = '';

	propriedade: FormGroup = new FormGroup({
		id: new FormControl('', []),
		nome: new FormControl('', [Validators.required,]),
		produtor: new FormControl(this.data.produtor_id, [Validators.required,]), //Produtor recuperado pelo id da rota
		cidade: new FormControl('', [Validators.required,]),
		estado: new FormControl('', [Validators.required,]),
		area_total_fazenda: new FormControl('', [Validators.required,]),
		area_agricultavel: new FormControl('', [Validators.required,]),
		area_vegetacao: new FormControl('', [Validators.required,]),
	});

	ngOnInit(): void {
		if (this.data?.propriedade?.id) {
			this.propriedade.patchValue(this.data.propriedade);
		}
		this.propriedade.controls['area_total_fazenda'].valueChanges.subscribe(value => this.verificaTotalFazenda());
		this.propriedade.controls['area_agricultavel'].valueChanges.subscribe(value => this.verificaTotalFazenda());
		this.propriedade.controls['area_vegetacao'].valueChanges.subscribe(value => this.verificaTotalFazenda());
	}

	verificaTotalFazenda() {
		let area_total = this.propriedade.controls['area_total_fazenda'].value;
		let area_agricultavel = this.propriedade.controls['area_agricultavel'].value;
		let area_vegetacao = this.propriedade.controls['area_vegetacao'].value;
		if ((area_agricultavel + area_vegetacao) > area_total) {
			this.propriedade.controls['area_total_fazenda'].setErrors({ area: true });
		} else {
			this.propriedade.controls['area_total_fazenda'].setErrors(null);
		}
	}

	// listaProdutores() {
	// 	this.produtorService.listar().subscribe({
	// 		next: (resultado: Produtor[]) => {
	// 			this.produtores = resultado;
	// 		}
	// 	})
	// }

	adicionarPropriedade() {
		if (!this.data?.propriedade?.id) {
			this.propriedadeService.salvar(this.propriedade.value as any).subscribe({
				next: (resultado: Propriedade) => {
					this.fechar();
				}
			});
		} else {
			this.propriedadeService.editar(this.propriedade.value as any).subscribe({
				next: (resultado: Propriedade) => {
					this.fechar();
				}
			});
		}
	}

	fechar() {
		this.dialogRef.close();
	}
}
