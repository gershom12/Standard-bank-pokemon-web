import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PokemonPageComponent } from './pokemon-page.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { PokemonsService } from '../../services/pokemons.service';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

describe('PokemonPageComponent', () => {
  let component: PokemonPageComponent;
  let fixture: ComponentFixture<PokemonPageComponent>;
  let activatedRouteMock: Partial<ActivatedRoute>;
  let routerMock: Partial<Router>;
  let pokemonsServiceMock: jasmine.SpyObj<PokemonsService>;

  beforeEach(async () => {
    activatedRouteMock = {
      params: of({ id: '1' }) // Make sure params is assigned a valid observable
    };

    routerMock = {
      navigateByUrl: jasmine.createSpy('navigateByUrl')
    };

    const pokemonsServiceSpy = jasmine.createSpyObj('PokemonsService', ['getPokemonById', 'getPokemonsImage']);
    await TestBed.configureTestingModule({
      imports: [MatGridListModule, MatProgressSpinnerModule],
      declarations: [PokemonPageComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: Router, useValue: routerMock },
        { provide: PokemonsService, useValue: pokemonsServiceSpy }
      ]
    }).compileComponents();

    pokemonsServiceMock = TestBed.inject(PokemonsService) as jasmine.SpyObj<PokemonsService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PokemonPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
