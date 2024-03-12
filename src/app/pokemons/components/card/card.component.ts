import { Component, Input, OnInit } from '@angular/core';
import { PokemonsService } from '../../services/pokemons.service';

@Component({selector: 'pokemon-card', templateUrl: './card.component.html',})
export class CardComponent implements OnInit {
  public pokemons: any[] = [];
  constructor(private pokemonsService: PokemonsService) {}
  @Input()
  public pokemon: any;
  public idPokemon: string = '';
  ngOnInit(): void {
    if (!this.pokemon) 
      throw Error('Pokemon Property is Required');
    this.idPokemon = this.pokemon.url.split('/').filter(Boolean).pop();
    this.pokemonsService
      .getPokemonsImage(this.idPokemon)
      .subscribe(
        (pokemons) => (this.pokemons = pokemons.sprites.front_default)
      );
  }
}
