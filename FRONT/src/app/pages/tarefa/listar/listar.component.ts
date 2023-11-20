import { Component, OnInit } from '@angular/core';
import { Tarefa } from 'src/app/models/tarefa.mode';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: 'app-listar',
  templateUrl: 'listar.component.html',
  styles: [
  ]
})
export class ListarComponent implements OnInit {


  constructor(
    private client: HttpClient,
    private snackBar: MatSnackBar) { }

  colunasTabelaListar: string[] = [
    "id",
    "titulo",
    "descricao",
    "status",
    "categoria"
  ];

  tarefas: Tarefa[] = [];

  ngOnInit(): void {
    this.client
      .get
      
  }

}
