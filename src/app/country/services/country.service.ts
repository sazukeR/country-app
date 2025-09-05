import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, Observable, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);

  searchByCapital(query: string) {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.restCountriesToCountries(resp)),
      catchError((err) => {
        console.log('Error Fetching', err);
        return throwError(() => new Error(`No se pudo encontrar capital por ${query}`));
      })
    );
  }

  searchByCountry(query: string) {
    query = query.toLowerCase();

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.restCountriesToCountries(resp)),
      delay(3000),
      catchError((err) => {
        console.log('Error Fetching', err);
        return throwError(() => new Error(`No se pudo encontrar un pais por ${query}`));
      })
    );
  }

  searchByAlphaCode(code: string) {
    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((resp) => CountryMapper.restCountriesToCountries(resp)),
      map((countries) => countries.at(0)),

      catchError((err) => {
        console.log('Error Fetching', err);
        return throwError(() => new Error(`No se encontraron resultados ${code}`));
      })
    );
  }
}
