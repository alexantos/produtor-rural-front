import { ModelBase } from "./base.interface";
import { Produtor } from "./produtor.interface";

export interface Propriedade extends ModelBase {
    nome: string;
    produtor: Produtor;
    cidade: string;
    estado: string; //TODO: Choices
    area_total_fazenda: number;
    area_agricultavel: number;
    area_vegetacao: number;
}