import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from './app.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule } from "@angular/forms";
import {MatCardModule} from '@angular/material/card';
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { ListarComponent } from './pages/tarefa/listar/listar.component';
import { CadastrarComponent } from './pages/tarefa/cadastrar/cadastrar.component';
import { AlterarComponent } from './pages/tarefa/alterar/alterar.component';
import { ListarconcluidasComponent } from './pages/tarefa/listarconcluidas/listarconcluidas.component';
import { ListarnaoconcluidasComponent } from './pages/tarefa/listarnaoconcluidas/listarnaoconcluidas.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    ListarComponent,
    CadastrarComponent,
    AlterarComponent,
    ListarconcluidasComponent,
    ListarnaoconcluidasComponent
  ],
  imports: [  
    BrowserModule,
    NoopAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatTableModule,
    MatSnackBarModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
    MatButtonModule,
    FormsModule,
    MatFormFieldModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
