import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './pages/tarefa/listar/listar.component';
import { CadastrarComponent } from './pages/tarefa/cadastrar/cadastrar.component';

const routes: Routes = [
  {
    path: 'pages/tarefa/listar',
    component: ListarComponent
  },
  {
    path: 'pages/tarefa/cadastrar',
    component: CadastrarComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
