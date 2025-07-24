import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseService } from './base/base.service';
import { HttpClient } from '@angular/common/http';
import { Propriedade } from '../interfaces/propriedade.interface';

@Injectable({
    providedIn: 'root'
})
export class PropriedadeService extends BaseService<Propriedade> {

    constructor(private http: HttpClient) {
        super('propriedade/', http);
    }

}