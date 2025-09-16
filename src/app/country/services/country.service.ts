import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { catchError, delay, map, of, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Country, Region } from '../interfaces/country.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {
  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>(); // Actually we could use a Record<> but in this case we rather to use Map() to handle the type for cache
  private queryCacheCountry = new Map<string, Country[]>();

  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital(query: string) {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    console.log('I appear when the query gets to the server :)');

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.restCountriesToCountries(resp)),
      tap((countries) => this.queryCacheCapital.set(query, countries)), // we set the values of the query in an object
      catchError((err) => {
        console.log('Error Fetching', err);
        return throwError(() => new Error(`No se pudo encontrar capital por ${query}`));
      })
    );
  }

  searchByCountry(query: string) {
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.restCountriesToCountries(resp)),
      tap((countries) => this.queryCacheCountry.set(query, countries)),
      // delay(3000),
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

  searchByRegion(region: Region) {
    if (this.queryCacheRegion.has(region)) {
      return of(this.queryCacheRegion.get(region) ?? []);
    }

    console.log('I appear when the query gets to the server :)');

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      map((resp) => CountryMapper.restCountriesToCountries(resp)),
      tap((countries) => this.queryCacheRegion.set(region, countries)), // we set the values of the query in an object
      catchError((err) => {
        console.log('Error Fetching', err);
        return throwError(() => new Error(`No se pudo encontrar capital por ${region}`));
      })
    );
  }
}
