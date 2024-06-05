import { Component, OnInit } from '@angular/core';

declare var $: any;
@Component({
  selector: 'app-mouse',
  templateUrl: './mouse.component.html',
  styleUrls: ['./mouse.component.css']
})
export class MouseComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    var mouse_parallax = $(".mouse_parallax");

    $(".mouse_parallax").mousemove(function(e) {
      var posX = e.offsetX;
      var posY = e.offsetY;

      for (let i = 0; i < mouse_parallax.length; i++) {
          $(mouse_parallax[i]).css({
              "width": "110%",
              "left": -posX / (i*250) + "%",
              "top": posY / (i*250) + "%",
          })
          
      }
      $(mouse_parallax[0]).css({"width":"100%"})


    })
  }

}
