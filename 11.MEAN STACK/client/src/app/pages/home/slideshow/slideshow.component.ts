import { Component, OnInit } from '@angular/core';
import { SlideshowService } from '../../../services/slideshow/slideshow.service';
import { Ruta } from '../../../config';

declare var $: any;

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css']
})
export class SlideshowComponent implements OnInit {
  public slides: any;
  public render: boolean = true;
  public url: string = Ruta.api;

  constructor(private _slideshowService: SlideshowService) { 
    //Recibiendo datos dinamicos
    // el subscibre trae la peticion con una funcion de flecha, es como una promesa
    this._slideshowService.getSlideshow().subscribe(data => {
      this.slides = data;
      this.slides = this.slides.slides;
    });

  }

  ngOnInit(): void {
  }

  callback() {
    if (this.render) {
        this.render = false;
      
      $('.slideShow').jdSlider({
        wrap: ".slide-inner",
        isAuto: true,
  
        isLoop: true,
        interval: 7000,
        isCursor: true,
  
      });
      
    }
  }

}
