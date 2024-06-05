import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Ruta } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class SlideshowService {

  public url: string;
  constructor(private http: HttpClient) {
    this.url = Ruta.api + '/slide';
   }

   getSlideshow() {
    return this.http.get(`${this.url}/mostrar`);
   }


}
