import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

//importamos la ruta
import { Ruta } from '../../config';
@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  public url: string;
  constructor(private http: HttpClient) { 
    this.url = Ruta.api + '/gallery';
  }

  getGallery() {
    return this.http.get(`${this.url}/mostrar`);
  }
  
}
