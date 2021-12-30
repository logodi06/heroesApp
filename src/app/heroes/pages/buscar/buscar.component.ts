import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Heroe } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {

  //es el campo que recibe lo que se está escribiendo en el input de busqueda, y es lo que 
  //se  muestra en el input al seleccionar una opción
  termino: string = '';
  heroes: Heroe[] = [];  
  heroeSeleccionado: Heroe | undefined;
  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando() {
    this.heroesService.getSugerencias(this.termino.trim())
      .subscribe(heroes => {
        this.heroes = heroes;
        console.log(heroes);
      });

      console.log(this.termino);
  }

  //Desde el html se llama la función y esta recibe el evento seleccionado
  //en este caso se obtiene el objeto de heroe
  opcionSeleccionada(event: MatAutocompleteSelectedEvent){
    
    if(!event.option.value){
      this.heroeSeleccionado = undefined;
      console.log('No hay valor');
      return;
     
    }
      //Se almacena en heroe el valor seleccionado
      const heroe: Heroe = event.option.value;
      //En la variable termino se asigna el nombre del superheroe para que este sea mostrado 
      //en el input y este se manda a la vista html
      this.termino = heroe.superhero;
      //console.log(heroe);
  
      this.heroesService.getHeroePorId( heroe.id! )
       .subscribe( heroe => this.heroeSeleccionado = heroe);
    
  
  }
}
