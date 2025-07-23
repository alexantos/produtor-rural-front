import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base/base.service';
import { HttpClient } from '@angular/common/http';
import { Produtor } from '../interfaces/produtor.interface';

@Injectable({
    providedIn: 'root'
})
export class ProdutorService extends BaseService<Produtor> {

    constructor(private http: HttpClient) {
        super('produtor/', http);
    }

    // viaCep(cep: string): Observable<ViaCep> {
    //     return this.http.get<ViaCep>('https://viacep.com.br/ws/' + cep + '/json/')
    // }
}