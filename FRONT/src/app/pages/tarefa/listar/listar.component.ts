import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/models/tarefa.mode';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from "@angular/material/snack-bar";
import { Categoria } from 'src/app/models/categoria.model';

@Component({
  selector: 'app-listar',
  templateUrl: 'listar.component.html',
  styleUrls: [ 'listar.component.css'
  ]
})
export class ListarComponent implements OnInit {


  constructor(
    private client: HttpClient,
    private snackBar: MatSnackBar) { }

  colunasTabelaListar: string[] = [
    "tarefaId",
    "titulo",
    "descricao",
    "status",
    "categoria"
  ];

  categorias: Categoria[]=[];
  tarefas: Tarefa[] = [];

  ngOnInit(): void {
    this.client
      .get<Tarefa[]>("https://localhost:7015/api/tarefa/listar")
      .subscribe({
        next: (tarefas) => {
          console.table(tarefas);
          this.tarefas = tarefas;
        },
        error: (erro) => {
          console.log(erro);
        },
      });
    
    this.client
      .get<Categoria[]>("https://localhost:7015/api/categoria/listar")
      .subscribe({
        next: (categorias) =>{
          console.table(categorias);

          this.tarefas.forEach(tarefa => {
            categorias.forEach(categoria => {
              if(tarefa.categoriaId == categoria.categoriaId){
                tarefa.categoria = categoria;
                console.log(tarefa);
              }
            });
          })
          
          this.categorias = categorias;
        },
        error: (erro) => {
          console.log(erro)
        }
      })
  }

}
