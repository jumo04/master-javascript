import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleService } from 'src/app/services/article/article.service';

declare var $: any;
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  public articles: any;
  public callback: boolean = true;
  constructor(private _articleService: ArticleService, private _activatedRoute: ActivatedRoute) { 

    this._articleService.getArticle().subscribe(data => {
      this.articles = data;
    })
  }

  ngOnInit(): void {

    //superscrollograma

  }

  callbackFunction() {
    if (this.callback) {
        this.callback = false;
      
    
      
    }
  }

}
