import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
//esta clase se necesita para navegar entre paginas y para obtener los  parametros
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from '../../services/article/article.service';
import { UsersService } from '../../services/users/users.service';

//Esta clase es la que se necesita para trabajar con formularios
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  public articleJson: any;
  public article: any;
  public render: boolean = true;
  public contenidoArticle: any;
  public login: false;
  public username: string;
  public password: string;
  public results: any;
  public validarLogin: boolean = true;



  constructor(private _activatedRoute: ActivatedRoute, 
              private _articleService: ArticleService, 
              private _usersService: UsersService) { 
    console.log("parametro", this._activatedRoute.snapshot.params['id']);

    this._articleService.getArticle().subscribe(data => {
      this.articleJson = data;
      this.article = this.articleJson.find(result => {
        return result.url == _activatedRoute.snapshot.params['id'];
        
      });
      this.contenidoArticle = this.article.contenido;
    })
    
  }

  ngOnInit(): void {
  }

  /**
   * Dinamico de registro
   * @param f
   */

  onSubmit(f: NgForm) {
    this._usersService.getUsers().subscribe(data => {
      this.results = data;
      this.login = this.results.find(result => {
        if (result.usuario == this.username && result.password == this.password) {
           return true;
        }else{
          return false;
        }
      });

      if (!this.login) {
        this.validarLogin = false;
      }
    });

    
  }

}
