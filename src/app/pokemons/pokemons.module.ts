import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonPageComponent } from './pages/pokemon-page/pokemon-page.component';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { MaterialModule } from '../material/material.module';
import { CardComponent } from './components/card/card.component';
import { DefaulttextPipe } from './pipes/defaulttext.pipe';

@NgModule({
  declarations: [
    PokemonPageComponent,
    LayoutPageComponent,
    ListPageComponent,
    CardComponent,
    DefaulttextPipe,
  ],
  imports: [CommonModule, PokemonsRoutingModule, MaterialModule],
})
export class PokemonsModule {}
