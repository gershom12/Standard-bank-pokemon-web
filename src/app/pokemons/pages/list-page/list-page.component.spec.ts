import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListPageComponent } from './list-page.component';
import { PokemonsService } from '../../services/pokemons.service';
import { of } from 'rxjs';
import { MatDividerModule } from '@angular/material/divider';
import { MatPaginatorModule } from '@angular/material/paginator';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { PageEvent } from '@angular/material/paginator';

describe('ListPageComponent', () => {
  let component: ListPageComponent;
  let fixture: ComponentFixture<ListPageComponent>;
  let pokemonsService: jasmine.SpyObj<PokemonsService>;

  beforeEach(async () => {
    const pokemonsServiceSpy = jasmine.createSpyObj('PokemonsService', ['getPokemons']);
    await TestBed.configureTestingModule({
      imports: [ MatDividerModule, MatPaginatorModule, BrowserAnimationsModule ],
      declarations: [ListPageComponent],
      providers: [{ provide: PokemonsService, useValue: pokemonsServiceSpy }]
    }).compileComponents();

    pokemonsService = TestBed.inject(PokemonsService) as jasmine.SpyObj<PokemonsService>;
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should fetch pokemons on initialization', () => {
    const mockPokemons = { results: [{ name: 'Pikachu' }, { name: 'Bulbasaur' }], count: 2 };
    pokemonsService.getPokemons.and.returnValue(of(mockPokemons));

    component.ngOnInit();

    expect(pokemonsService.getPokemons).toHaveBeenCalled();
    // expect(component.pokemons).toEqual(mockPokemons.results);
    expect(component.totalPokemons).toEqual(mockPokemons.count);
  });

  it('should handle page event', () => {
    const mockPageEvent: PageEvent = { pageIndex: 1, pageSize: 10, length: 20 };
    const mockPokemons = { results: [{ name: 'Charmander' }, { name: 'Squirtle' }], count: 2 };
    pokemonsService.getPokemons.and.returnValue(of(mockPokemons));

    component.handlePageEvent(mockPageEvent);

    expect(pokemonsService.getPokemons).toHaveBeenCalledWith(mockPageEvent.pageIndex * mockPageEvent.pageSize, mockPageEvent.pageSize);
    // expect(component.pokemons).toEqual(mockPokemons.results);
    expect(component.pageSize).toEqual(mockPageEvent.pageIndex * mockPageEvent.pageSize);
    expect(component.currentPage).toEqual(mockPageEvent.pageIndex);
  });
});
