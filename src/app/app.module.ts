import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { ListComponent } from './components/list/list.component';

import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonModule } from '@angular/material/button';
import { DeleteComponent } from './components/dialog/delete/delete.component';
import { MatDialogModule } from '@angular/material/dialog';
import { EditComponent } from './components/dialog/edit/edit.component';
import { MoreComponent } from './components/dialog/more/more.component';
import { AddComponent } from './components/dialog/add/add.component';
import { Query1Component } from './components/dialog/query1/query1.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    DeleteComponent,
    EditComponent,
    MoreComponent,
    AddComponent,
    Query1Component
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    FormsModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
