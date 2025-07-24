import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ProdutorService } from '../../../services/produtor.service';
import { Produtor } from '../../../interfaces/produtor.interface';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask'
import { MatDialogRef } from '@angular/material/dialog';
import { cpf } from 'cpf-cnpj-validator';
import { CommonModule } from '@angular/common';


@Component({
	selector: 'app-adicionar-produtor',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, NgxMaskDirective,],
	providers: [provideNgxMask(),],
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './adicionar-produtor.component.html',
	styleUrl: './adicionar-produtor.component.scss'
})
export class AdicionarProdutorComponent implements OnInit {

	readonly dialogRef = inject(MatDialogRef<AdicionarProdutorComponent>);

	readonly produtorService = inject(ProdutorService);

	mask_cpf_cnpj: string = '000.000.000-009'

	produtor: FormGroup = new FormGroup({
		nome: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžæÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/)]),
		cpf_cnpj: new FormControl('', [Validators.required,]),
	});

	ngOnInit(): void {
		this.produtor.controls['cpf_cnpj'].valueChanges.subscribe((value) => {
			if (value.length >= 12) {
				this.mask_cpf_cnpj = '00.000.000/0000-00'
			} else {
				this.mask_cpf_cnpj = '000.000.000-009'
			}
			if (!cpf.isValid(value)) {
				this.produtor.controls['cpf_cnpj'].setErrors({ invalido: true })
			}
			console.log('valid: ', this.produtor.controls['nome'])
		});
	}

	adicionarProdutor() {
		this.produtorService.salvar(this.produtor.value as any).subscribe({
			next: (resultado: Produtor) => {
				this.fechar();
			}
		})
	}

	fechar() {
		this.dialogRef.close();
	}
}
