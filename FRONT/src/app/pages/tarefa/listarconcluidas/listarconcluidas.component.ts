import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Categoria } from 'src/app/models/categoria.model';
import { Tarefa } from 'src/app/models/tarefa.mode';

@Component({
  selector: 'app-listarconcluidas',
  templateUrl: 'listarconcluidas.component.html',
  styleUrls: ['listarconcluidas.component.css'
  ]
})
export class ListarconcluidasComponent implements OnInit {


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
      .get<Tarefa[]>("https://localhost:7015/api/tarefa/concluidas")
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
