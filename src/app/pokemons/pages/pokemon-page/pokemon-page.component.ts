import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { PokemonsService } from '../../services/pokemons.service';

@Component({
  selector: 'app-pokemon-page',
  templateUrl: './pokemon-page.component.html',
})
export class PokemonPageComponent implements OnInit {
  public pokemon?: any;
  public image?: string;
  constructor(
    private pokemonsService: PokemonsService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.activateRoute.params
      .pipe(switchMap(({ id }) => this.pokemonsService.getPokemonsImage(id)))
      .subscribe((image) => {
        this.image = image.sprites.front_default;
        return;
      });
    this.activateRoute.params
      .pipe(switchMap(({ id }) => this.pokemonsService.getPokemonById(id)))
      .subscribe((pokemon) => {
        if (!pokemon) return this.router.navigate(['/pokemons/list']);
        this.pokemon = pokemon;
        return;
      });
  }
  goBack(): void {
    this.router.navigateByUrl('pokemons/list');
  }
}
