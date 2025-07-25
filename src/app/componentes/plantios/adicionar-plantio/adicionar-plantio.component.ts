import { Component, inject, OnInit } from '@angular/core';
import { CulturaService } from '../../../services/cultura.service';
import { SafraService } from '../../../services/safra.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PlantioService } from '../../../services/plantio.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Plantio } from '../../../interfaces/plantio.interface';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Safra } from '../../../interfaces/safra.interface';
import { Cultura } from '../../../interfaces/cultura.interface';
import { map, max, Observable, of, startWith } from 'rxjs';
import { AsyncPipe, CommonModule } from '@angular/common';


@Component({
	selector: 'app-adicionar-plantio',
	standalone: true,
	imports: [CommonModule, MatFormFieldModule, MatInputModule, MatIconModule, ReactiveFormsModule, MatAutocompleteModule, AsyncPipe],
	providers: [],
	templateUrl: './adicionar-plantio.component.html',
	styleUrl: './adicionar-plantio.component.scss'
})
export class AdicionarPlantioComponent implements OnInit {

	readonly dialogRef = inject(MatDialogRef<AdicionarPlantioComponent>);

	readonly plantioService = inject(PlantioService);

	data = inject(MAT_DIALOG_DATA);
	readonly culturaService = inject(CulturaService);
	readonly safraService = inject(SafraService);

	culturas: Cultura[] = [];
	culturaFiltradas: Observable<Cultura[]> = of([]);
	culturaSelecionada: Cultura | null = null;

	safras: Safra[] = [];
	safraFiltradas: Observable<Safra[]> = of([]);
	safraSelecionada: Safra | null = null;

	fluxoCriacao: boolean = true;

	plantio: FormGroup = new FormGroup({
		id: new FormControl('', []),
		cultura: new FormControl('', [Validators.required]),
		safra: new FormControl('', [Validators.required, Validators.max(new Date().getFullYear()), Validators.min(1900)]),
		propriedade: new FormControl(this.data.propriedade_id, []),
		observacoes: new FormControl('', []),
	});

	ngOnInit(): void {
		if (this.data?.plantio?.id) {
			this.fluxoCriacao = false;
			this.plantio.patchValue(this.data.plantio);
		}
		this.listarCulturas();
		this.listarSafras();
	}

	listarCulturas() {
		this.culturaService.listar().subscribe({
			next: (resultado: Cultura[]) => {
				this.culturas = resultado;
				this.culturaFiltradas = this.plantio.controls['cultura'].valueChanges.pipe(
					startWith(''),
					map(value => this._filtraCulturas(value || '')),
				);
				if (this.data?.plantio?.id) {
					this.culturaSelecionada = this.culturas.find((cultura) => cultura.id == this.data.plantio.cultura) as Cultura;
					this.plantio.controls['cultura'].setValue(this.culturaSelecionada.descricao);
				}
			}
		})
	}

	listarSafras() {
		this.safraService.listar().subscribe({
			next: (resultado: Safra[]) => {
				this.safras = resultado;
				this.safraFiltradas = this.plantio.controls['safra'].valueChanges.pipe(
					startWith(''),
					map(value => this._filtraSafras(value || '')),
				);
				if (this.data?.plantio?.id) {
					this.safraSelecionada = this.safras.find((safra) => safra.id == this.data.plantio.safra) as Safra;
					this.plantio.controls['safra'].setValue(this.safraSelecionada.ano);
				}
			}
		})
	}


	adicionarPlantio() {
		this.culturaSelecionada = this.culturas.find((cultura) => cultura.descricao == this.plantio.controls['cultura'].value) || null;
		this.safraSelecionada = this.safras.find((safra) => safra.ano == this.plantio.controls['safra'].value) || null;
		if (!this.culturaSelecionada) {
			this.criarCultura();
		} else if (!this.safraSelecionada) {
			this.criarSafra();
		} else {
			this.criarPlantio();
		}
	}

	criarCultura() {
		this.culturaService.salvar({ descricao: this.plantio.controls['cultura'].value }).subscribe({
			next: (resultado: Cultura) => {
				this.culturaSelecionada = resultado;
				if (!this.safraSelecionada) {
					this.criarSafra();
				} else {
					this.criarPlantio();
				}
			}
		})
	}

	criarSafra() {
		this.safraService.salvar({ ano: this.plantio.controls['safra'].value }).subscribe({
			next: (resultado: Safra) => {
				this.safraSelecionada = resultado;
				this.criarPlantio();
			}
		})
	}

	criarPlantio() {
		if (this.fluxoCriacao) {
			let plantio: Plantio = {
				propriedade: this.plantio.controls['propriedade'].value,
				cultura: this.culturaSelecionada?.id as any,
				safra: this.safraSelecionada?.id as any,
			}
			this.plantioService.salvar(plantio).subscribe({
				next: (resultado: Plantio) => {
					this.fechar();
				}
			});
		} else {
			let plantio: Plantio = {
				id: this.data.plantio.id,
				propriedade: this.plantio.controls['propriedade'].value,
				cultura: this.culturaSelecionada?.id as any,
				safra: this.safraSelecionada?.id as any,
			}
			this.plantioService.editar(plantio).subscribe({
				next: (resultado: Plantio) => {
					this.fechar();
				}
			});
		}
	}

	fechar() {
		this.dialogRef.close();
	}

	private _filtraCulturas(value: string): Cultura[] {
		const filterValue = value.toLowerCase();
		let culturasFiltradas = this.culturas.filter(option => option.descricao.toLowerCase().includes(filterValue))
		return culturasFiltradas;
	}

	private _filtraSafras(value: string): Safra[] {
		const filterValue = value;
		let safraFiltradas = this.safras.filter(option => option.ano.includes(filterValue))
		return safraFiltradas;
	}
}
