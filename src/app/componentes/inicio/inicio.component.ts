import { Component } from '@angular/core';
import { ProdutorService } from '../../services/produtor.service';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js';
import { GraficoService } from '../../services/grafico.service';

@Component({
	selector: 'app-inicio',
	standalone: true,
	imports: [BaseChartDirective],
	templateUrl: './inicio.component.html',
	styleUrl: './inicio.component.scss'
})
export class InicioComponent {

	public estadosChartOptions: ChartConfiguration['options'] = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: 'top',
			},
		},
	};
	public estadosChartData: ChartData<'pie', number[], string | string[]> = {
		labels: [],
		datasets: [
			{
				data: [],
			},
		],
	};

	public culturasChartOptions: ChartConfiguration['options'] = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: 'top',
			},
		},
	};
	public culturasChartData: ChartData<'pie', number[], string | string[]> = {
		labels: [],
		datasets: [
			{
				data: [],
			},
		],
	};

	public usoSoloChartOptions: ChartConfiguration['options'] = {
		responsive: true,
		plugins: {
			legend: {
				display: true,
				position: 'top',
			},
		},
	};
	public usoSoloChartData: ChartData<'pie', number[], string | string[]> = {
		labels: [],
		datasets: [
			{
				data: [],
			},
		],
	};


	constructor(private graficoService: GraficoService) {
		this.graficoService.graficoEstados().subscribe((resultado) => {
			console.log('Grafico estados: ', resultado);
			this.estadosChartData = {
				labels: resultado.map((grafico: any) => grafico.descricao),
				datasets: [
					{ data: resultado.map((grafico: any) => grafico.quantidade) }
				]
			}
		});
		this.graficoService.graficoCultura().subscribe((resultado) => {
			console.log('Gráfico culturas: ', resultado);
			this.culturasChartData = {
				labels: resultado.map((grafico: any) => grafico.descricao),
				datasets: [
					{ data: resultado.map((grafico: any) => grafico.quantidade) }
				]
			}
		});
		this.graficoService.graficoUsoSolo().subscribe((resultado) => {
			console.log('Gráfico uso solo: ', resultado);
			this.usoSoloChartData = {
				labels: ['Total agricultável', 'Total vegetação'],
				datasets: [
					{ data: [resultado.total_agricultavel, resultado.total_vegetacao] }
				]
			}
		});
	}

}
