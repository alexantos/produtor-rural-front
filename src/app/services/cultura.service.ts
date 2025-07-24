import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { HttpClient } from '@angular/common/http';
import { Cultura } from '../interfaces/cultura.interface';

@Injectable({
    providedIn: 'root'
})
export class CulturaService extends BaseService<Cultura> {

    constructor(private http: HttpClient) {
        super('cultura/', http);
    }

}