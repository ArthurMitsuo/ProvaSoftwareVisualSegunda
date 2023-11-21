import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.model';
import { Tarefa } from 'src/app/models/tarefa.mode';

@Component({
  selector: 'app-cadastrar',
  templateUrl: 'cadastrar.component.html',
  styleUrls: ['cadastrar.component.css'
  ]
})
export class CadastrarComponent implements OnInit {
  titulo: string = "";
  descricao: string = "";
  status: string = "";
  categoria?: Categoria;
  categoriaId: number= 0;

  categorias?: Categoria[]=[];

  tarefas: Tarefa[] = [];

  constructor(
    private client: HttpClient,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.client
      .get<Tarefa[]>("https://localhost:7015/api/tarefa/listar")
      .subscribe({
        next: (tarefas) => {
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
          this.categorias = categorias;
        },
        error: (erro) => {
          console.log(erro)
        }
      })
  }

  cadastrar(): void {
    this.categorias?.forEach(categoria => {
      if(this.categoriaId == categoria.categoriaId){
        this.categoria = categoria;
      }
    })
    
    let tarefa: Tarefa = {
      titulo: this.titulo,
      descricao: this.descricao,
      categoriaId: this.categoriaId,
      categoria: this.categoria
    };
    

    this.client
      .post<Tarefa>(
        "https://localhost:7015/api/tarefa/cadastrar",
        tarefa
      )
      .subscribe({
        next: (tarefa) => {
          this.snackBar.open(
            "Tarefa cadastrada com sucesso!!"
          );
          this.router.navigate(["pages/tarefa/listar"]);
        },
        error: (erro) => {
          console.log(erro);
        },
      });
  }

}
