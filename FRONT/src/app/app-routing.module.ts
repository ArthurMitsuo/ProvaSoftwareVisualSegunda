import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarComponent } from './pages/tarefa/listar/listar.component';
import { CadastrarComponent } from './pages/tarefa/cadastrar/cadastrar.component';
import { AlterarComponent } from './pages/tarefa/alterar/alterar.component';
import { ListarconcluidasComponent } from './pages/tarefa/listarconcluidas/listarconcluidas.component';
import { ListarnaoconcluidasComponent } from './pages/tarefa/listarnaoconcluidas/listarnaoconcluidas.component';

const routes: Routes = [
  {
    path: 'pages/tarefa/listar',
    component: ListarComponent
  },
  {
    path: 'pages/tarefa/cadastrar',
    component: CadastrarComponent
  },
  {
    path: 'pages/tarefa/alterar',
    component: AlterarComponent
  }
  ,
  {
    path: 'pages/tarefa/concluidas',
    component: ListarconcluidasComponent
  },
  {
    path: 'pages/tarefa/naoconcluidas',
    component: ListarnaoconcluidasComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
