import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { ProdutoresComponent } from './componentes/produtores/produtores.component';
import { ProdutorComponent } from './componentes/produtores/produtor/produtor.component';
import { PropriedadesComponent } from './componentes/propriedades/propriedades.component';

export const routes: Routes = [
    { path: '', redirectTo: 'inicio', pathMatch: 'full' },
    { path: 'inicio', component: InicioComponent },
    { path: 'produtores', component: ProdutoresComponent },
    { path: 'produtor/:id', component: ProdutorComponent },
    { path: 'propriedades', component: PropriedadesComponent },
];