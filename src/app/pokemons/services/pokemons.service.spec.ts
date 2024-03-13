import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { PokemonsService } from './pokemons.service';
import { environments } from '../../../environments/environments';

describe('PokemonsService', () => {
  let service: PokemonsService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonsService]
    });
    service = TestBed.inject(PokemonsService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve a pokemon by ID', () => {
    const mockPokemon = { id: '1', name: 'Pikachu' };
    const id = '1';

    service.getPokemonById(id).subscribe((pokemon) => {
      expect(pokemon).toEqual(mockPokemon);
    });

    const req = httpTestingController.expectOne(`${environments.baseUrl}/pokemon-species/${id}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockPokemon);
  });

  it('should retrieve pokemon image by ID', () => {
    const id = '1';

    service.getPokemonsImage(id).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne(`${environments.baseUrl}/pokemon/${id}`);
    expect(req.request.method).toEqual('GET');

    req.flush({});
  });

  it('should retrieve pokemons with offset and limit', () => {
    const mockResult = { results: [{ name: 'Bulbasaur' }, { name: 'Charmander' }], count: 2 };
    const offset = 0;
    const limit = 2;

    service.getPokemons(offset, limit).subscribe((result) => {
      expect(result).toEqual(mockResult);
    });

    const req = httpTestingController.expectOne(`${environments.baseUrl}/pokemon-species?offset=${offset}&limit=${limit}`);
    expect(req.request.method).toEqual('GET');

    req.flush(mockResult);
  });
});
