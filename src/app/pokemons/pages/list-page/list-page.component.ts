import { Component, OnInit } from '@angular/core';
import { Pokemon, Result } from '../../interfaces/pokemon.interface';
import { PokemonsService } from '../../services/pokemons.service';
import { PageEvent } from '@angular/material/paginator';
import { of } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
})
export class ListPageComponent implements OnInit {
  public pokemons: Result[] = [];
  pageSize = 0;
  limit = 0;
  totalPokemons = 0;
  currentPage = 0;

  constructor(private pokemonsService: PokemonsService) {}

  ngOnInit(): void {
    const pokemonsObservable = this.pokemonsService.getPokemons(this.pageSize, this.limit);
    if (pokemonsObservable) {
      pokemonsObservable.subscribe((pokemons) => {
        this.pokemons = pokemons.results;
        this.totalPokemons = pokemons.count;
      });
    } else {
      console.error('getPokemons method of pokemonsService returned undefined.');
    }
  }

  handlePageEvent(pageEvent: PageEvent) {
    this.limit = pageEvent.pageIndex;
    this.currentPage = pageEvent.pageIndex;
    this.pageSize = this.currentPage * pageEvent.pageSize;
    const pokemonsObservable = this.pokemonsService.getPokemons(this.pageSize, pageEvent.pageSize);
    if (pokemonsObservable) {
      pokemonsObservable.subscribe((pokemons) => (this.pokemons = pokemons.results));
    } else {
      console.error('getPokemons method of pokemonsService returned undefined.');
    }
  }
}
