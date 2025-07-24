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

	// readonly propriedadeService = inject(PropriedadeService);
	data = inject(MAT_DIALOG_DATA);
	readonly culturaService = inject(CulturaService);
	readonly safraService = inject(SafraService);

	culturas: Cultura[] = [];
	culturaFiltradas: Observable<Cultura[]> = of([]);
	culturaSelecionada: Cultura | null = null;

	safras: Safra[] = [];
	safraFiltradas: Observable<Safra[]> = of([]);
	safraSelecionada: Safra | null = null;

	plantio: FormGroup = new FormGroup({
		cultura: new FormControl('', [Validators.required]),
		safra: new FormControl('', [Validators.required, Validators.max(new Date().getFullYear()), Validators.min(1900)]),
		propriedade: new FormControl(this.data.propriedade_id, []),
		observacoes: new FormControl('', []),
	});

	ngOnInit(): void {
		this.listarCulturas();
		this.listarSafras();
		this.culturaFiltradas = this.plantio.controls['cultura'].valueChanges.pipe(
			startWith(''),
			map(value => this._filtraCulturas(value || '')),
		);
		this.safraFiltradas = this.plantio.controls['safra'].valueChanges.pipe(
			startWith(''),
			map(value => this._filtraSafras(value || '')),
		);
	}

	listarCulturas() {
		this.culturaService.listar().subscribe({
			next: (resultado: Cultura[]) => {
				this.culturas = resultado;
				this.culturaFiltradas = of(this.culturas);
			}
		})
	}

	listarSafras() {
		this.safraService.listar().subscribe({
			next: (resultado: Safra[]) => {
				this.safras = resultado;
				this.safraFiltradas = of(this.safras);
			}
		})
	}


	adicionarPlantio() {
		console.log('Cultura Selecionada? ', this.culturaSelecionada);
		console.log('Criar safra? ', this.safraSelecionada);
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
		let plantio: Plantio = {
			propriedade: this.plantio.controls['propriedade'].value,
			cultura: this.culturaSelecionada?.id as any,
			safra: this.safraSelecionada?.id as any,
		}
		this.plantioService.salvar(plantio).subscribe({
			next: (resultado: Plantio) => {
				console.log('Plantio cadastrado: ', resultado)
			}
		});
	}

	fechar() {
		this.dialogRef.close();
	}

	private _filtraCulturas(value: string): Cultura[] {
		const filterValue = value.toLowerCase();
		let culturasFiltradas = this.culturas.filter(option => option.descricao.toLowerCase().includes(filterValue))
		this.culturaSelecionada = culturasFiltradas.length == 1 ? culturasFiltradas[0] : null;
		return culturasFiltradas;
	}

	private _filtraSafras(value: string): Safra[] {
		const filterValue = value;
		let safraFiltradas = this.safras.filter(option => option.ano.includes(filterValue))
		this.safraSelecionada = safraFiltradas.length == 1 ? safraFiltradas[0] : null;
		return safraFiltradas;
	}
}
