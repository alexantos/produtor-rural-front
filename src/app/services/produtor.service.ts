import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base/base.service';
import { HttpClient } from '@angular/common/http';
import { Produtor } from '../interfaces/produtor.interface';
import { environment } from '../../environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class ProdutorService extends BaseService<Produtor> {

    constructor(private http: HttpClient) {
        super('produtor/', http);
    }


    cardsProdutor(id: string): Observable<any> {
        return this.http.get<any>(environment.url_back + '/cards-produtor/', { params: { id: id } })
    }

}