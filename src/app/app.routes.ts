import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ProdutoresComponent } from './componentes/produtores/produtores.component';
import { ProdutorComponent } from './componentes/produtores/produtor/produtor.component';
import { PropriedadesComponent } from './componentes/propriedades/propriedades.component';
import { PropriedadeComponent } from './componentes/propriedades/propriedade/propriedade.component';
import { PlantiosComponent } from './componentes/plantios/plantios.component';
import { PlantioComponent } from './componentes/plantios/plantio/plantio.component';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: InicioComponent },
    //Produtores
    { path: 'produtores', component: ProdutoresComponent },
    { path: 'produtor/:id', component: ProdutorComponent },
    //Propriedades
    { path: 'propriedades', component: PropriedadesComponent },
    { path: 'propriedade/:id', component: PropriedadeComponent },
    //Plantios
    { path: 'plantios', component: PlantiosComponent },
    { path: 'plantio/:id', component: PlantioComponent },
];