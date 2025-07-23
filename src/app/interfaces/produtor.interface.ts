import { ModelBase } from "./base.interface";

export interface Produtor extends ModelBase {
    nome: string;
    cpf_cnpj: string;
}