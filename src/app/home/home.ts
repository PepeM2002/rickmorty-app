import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';   // 👈 IMPORTAR ESTO
import { Api } from '../service/api';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  data: any[] = [];
  page: number = 1;
  totalPages: number = 1;
  search: string = '';

  constructor(private api: Api) { }

  ngOnInit() {
    this.llenarData();
  }

  llenarData() {
    this.api.getData(this.page, this.search).subscribe({
      next: (resp) => {
        this.data = resp.results;
        this.totalPages = resp.info.pages;
      },
      error: () => {
        this.data = [];
      }
    });
  }

  buscar() {
    this.page = 1;
    this.llenarData();
  }

  siguiente() {
    if (this.page < this.totalPages) {
      this.page++;
      this.llenarData();
    }
  }

  anterior() {
    if (this.page > 1) {
      this.page--;
      this.llenarData();
    }
  }
}
