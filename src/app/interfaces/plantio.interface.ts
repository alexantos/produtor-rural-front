import { ModelBase } from "./base.interface";
import { Cultura } from "./cultura.interface";
import { Propriedade } from "./propriedade.interface";
import { Safra } from "./safra.interface";

export interface Plantio extends ModelBase {
    cultura: Cultura;
    safra: Safra;
    propriedade: Propriedade;
    observacao?: string;

    'cultura_descricao'?: string;
    'safra_descricao'?: string;
}