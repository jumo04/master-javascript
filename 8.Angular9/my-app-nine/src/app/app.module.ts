//BrowserModule es el modulo para buscar modulos
import { BrowserModule } from '@angular/platform-browser';
//NgModule es el modulo raiz
import { NgModule } from '@angular/core';

//importamos el modulo de rutas
import { AppRoutingModule } from './app-routing.module';

//importamos http client
import { HttpClientModule } from '@angular/common/http';

import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
//importamos el componente
import { AppComponent } from './app.component';
import { HeaderComponent } from './pages/home/header/header.component';
import { SlideshowComponent } from './pages/home/slideshow/slideshow.component';
import { GalleryComponent } from './pages/home/gallery/gallery.component';
import { MouseComponent } from './pages/home/mouse/mouse.component';
import { ArticleComponent } from './pages/home/article/article.component';
import { FormComponent } from './pages/home/form/form.component';
import { HomeComponent } from './pages/home/home.component';
import { ReadComponent } from './pages/read/read.component';


//los decoradores son funciones que modifican clases de javascript
@NgModule({
  //Las declaraciones son las clases de vista que pertenecen a este modulo
  //cada clase se debe de declarar
  declarations: [
    AppComponent,
    HeaderComponent,
    SlideshowComponent,
    GalleryComponent,
    MouseComponent,
    ArticleComponent,
    FormComponent,
    HomeComponent,
    ReadComponent
  ],
  //Las imports o importanciones se importan otros modulos cuyas clases exportadas sean necesarias para las plantillas
  //componentes declaradas en este modulo
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  //los providers son los creadores de servicios que este modulo contribuye a la recoleccion global de servicios se vuelve
  //accesibles en todas las partes de la aplicacion. esto lo habilitamos cuando invocamos servicios desde una base de datos
  providers: [],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
