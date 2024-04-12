import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country, State } from './types';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private countries$: Observable<Country[]>;

  constructor(private http: HttpClient) {
    this.countries$ = http.get<Country[]>('http://localhost:3000/countries');
  }

  getCountries(): Observable<Country[]> {
    return this.countries$;
  }

  getStates(countryCode: string): Observable<State[]> {
    return this.http.get<State[]>(`http://localhost:3000/states?countryCode=${countryCode}`);
  }
}
