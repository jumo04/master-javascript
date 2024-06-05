import { Component, OnInit } from '@angular/core';
import { GalleryService } from '../../../services/gallery/gallery.service';
import { Ruta } from '../../../config';

declare var $: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  public images: any;
  public callback: boolean = true;
  public url: string = Ruta.api;

  constructor(private _galleryService: GalleryService) { 

    this._galleryService.getGallery().subscribe(data => {
      this.images = data['galleries'];
      
    })
  }

  ngOnInit(): void {
  }

  callbackFunction() {
    if (this.callback) {
        this.callback = false;

        $('.pinterest-grid').pinterest_grid({
          no_columns: 4,
          padding_x: 10,
          padding_y: 10,
          margin_bottom: 50,
          single_column_breakpoint: 700
        });
    
    }
  }
}
