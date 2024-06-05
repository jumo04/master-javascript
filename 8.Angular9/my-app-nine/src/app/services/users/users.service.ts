import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

    public url: string;
    constructor(private http: HttpClient) { 
      this.url = "../assets/json/usuarios.json";
    }

    getUsers() {
      return this.http.get(this.url);
    }
  
}
