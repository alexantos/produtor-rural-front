import { Injectable } from '@angular/core';
import { BaseService } from './base/base.service';
import { HttpClient } from '@angular/common/http';
import { Safra } from '../interfaces/safra.interface';
import { Plantio } from '../interfaces/plantio.interface';

@Injectable({
    providedIn: 'root'
})
export class PlantioService extends BaseService<Plantio> {

    constructor(private http: HttpClient) {
        super('plantio/', http);
    }

}