// estos son los imports que especifican en la clase
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

//esto es un decorador que son funciones que modifican clases de javascript
//el componente es como trabaja angular por componenetes cada componente corresponde a una clase y por ende a una vista.

@Component({
  // css selector that identifies this component in a template
  selector: 'app-root',
  // standalone significa que los componenetes no necesitan ser declarados en un ngModule
  standalone: true,
  //imports son oos componenetes que no necesitan ser declarados en un ngModule que se van a usar en esta clase
  imports: [RouterOutlet],
  //template es el html de la vista
  templateUrl: './app.component.html',
  //style es el css de la vista
  styleUrl: './app.component.css'
})


//exportamos la clase del modulo raiz para importar otros archivos
export class AppComponent {
  title = 'my-app';
}
