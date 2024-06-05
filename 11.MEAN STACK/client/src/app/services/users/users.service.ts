import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Ruta } from '../../config';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    public url: string;
    constructor(private http: HttpClient) { 
      this.url = Ruta.api;
    }

    //Peticion de tipo post en angular
    storeUser(userList: any) {
      const headers = new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded"
      });
      return this.http.post(`${this.url}/user/create`, userList);
    }

    //login usuario angular nodejs

    loginUser(userList: any) {
      const headers = new HttpHeaders({
        "Content-Type": "application/x-www-form-urlencoded"
      });
      return this.http.post(`${this.url}/user/ingresar`, userList);
    }
  
}
