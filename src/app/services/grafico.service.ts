import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { HttpClient } from '@angular/common/http';
import { Safra } from '../interfaces/safra.interface';
import { Plantio } from '../interfaces/plantio.interface';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class GraficoService {

    constructor(private http: HttpClient) { }


    graficoEstados(): Observable<any> {
        return this.http.get<any>(environment.url_back + '/grafico-estados/')
    }

    graficoCultura(): Observable<any> {
        return this.http.get<any>(environment.url_back + '/grafico-culturas/')
    }

    graficoUsoSolo(): Observable<any> {
        return this.http.get<any>(environment.url_back + '/grafico-uso-solo/')
    }
}