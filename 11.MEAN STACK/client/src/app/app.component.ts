import { Component, OnInit } from '@angular/core';

declare var jQuery: any;
declare var $: any;

@Component({
  //el selector es el nombre de la etiqueta que va a contener el componente
  selector: 'app-root',
  //el template es el contenido de la etiqueta
  templateUrl: './app.component.html',
  //el style es el estilo de la etiqueta
  styleUrls: ['./app.component.css']
})
//la clase del componente donde se va a exportar
export class AppComponent implements OnInit {
  ngOnInit() {

    
  }
}
