import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  public url: string;
  constructor(private http: HttpClient) {

      this.url = "../assets/json/articulos.json";
   }

   getArticle() {
    return this.http.get(this.url);
   }
}
