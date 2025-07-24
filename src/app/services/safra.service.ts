import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { HttpClient } from '@angular/common/http';
import { Safra } from '../interfaces/safra.interface';

@Injectable({
    providedIn: 'root'
})
export class SafraService extends BaseService<Safra> {

    constructor(private http: HttpClient) {
        super('safra/', http);
    }

}