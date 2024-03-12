import { Component, OnInit } from '@angular/core';
import { Pokemon, Result } from '../../interfaces/pokemon.interface';
import { PokemonsService } from '../../services/pokemons.service';
import { PageEvent } from '@angular/material/paginator';

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
    this.pokemonsService
      .getPokemons(this.pageSize, this.limit)
      .subscribe((pokemons) => {
        this.pokemons = pokemons.results;
        this.totalPokemons = pokemons.count;
      });
  }
  handlePageEvent(pageEvent: PageEvent) {
    this.limit = pageEvent.pageIndex;
    this.currentPage = pageEvent.pageIndex;
    this.pageSize = this.currentPage * pageEvent.pageSize;
    this.pokemonsService
      .getPokemons(this.pageSize, pageEvent.pageSize)
      .subscribe((pokemons) => (this.pokemons = pokemons.results));
  }
}
