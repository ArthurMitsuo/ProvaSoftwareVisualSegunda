import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { Tarefa } from 'src/app/models/tarefa.mode';

@Component({
  selector: 'app-alterar',
  templateUrl: 'alterar.component.html',
  styleUrls: ['alterar.component.css'
  ]
})
export class AlterarComponent implements OnInit {

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  colunasTabelaListar: string[] = [
    "opcao",
    "tarefaId",
    "titulo",
    "descricao",
    "status",
    "categoria"
  ];

  categorias: Categoria[]=[];
  tarefas: Tarefa[] = [];
  tarefaId: number = 0;

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

  alterar(): void{
    let tarefa: Tarefa = {
      tarefaId: this.tarefaId
    };
    console.log(this.tarefaId)

    this.client
      .patch<Tarefa>(
        `https://localhost:7015/api/tarefa/alterar/${this.tarefaId}`,
        tarefa)
      .subscribe({
        next: (categorias) =>{
          this.snackBar.open(
            "Status da tarefa alterado com sucesso!!"
          );
          this.router.navigate(["pages/tarefa/listar"]);
        },
        error: (erro) => {
          console.log(erro)
        }
      })
  }
}
