import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private apiUrl = 'https://rickandmortyapi.com/api';

  constructor(private http: HttpClient) { }


  public getData(page: number = 1, name: string = ''): Observable<any> {
    let url = `${this.apiUrl}/character/?page=${page}`;

    if (name.trim().length > 0) {
      url += `&name=${name}`;
    }

    return this.http.get<any>(url);
  }
}
