import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Pokemon, Result } from '../interfaces/pokemon.interface';
import { environments } from '../../../environments/environments';

@Injectable({ providedIn: 'root' })
export class PokemonsService {
  private baseUrl: string = environments.baseUrl;
  constructor(private httpClient: HttpClient) {}
  getPokemonById(id: string): Observable<any> {
    return this.httpClient
      .get<any>(`${this.baseUrl}/pokemon-species/${id}`)
      .pipe(catchError((e) => of(undefined)));
  }

  getPokemonsImage(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/pokemon/${id}`);
  }

  getPokemons(offset: Number, limit: number): Observable<any> {
    return this.httpClient.get<Result>(
      `${this.baseUrl}/pokemon-species?offset=${offset}&limit=${limit}`
    );
  }
}
