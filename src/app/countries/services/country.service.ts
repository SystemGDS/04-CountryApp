import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { Country } from '../interfaces/country.interface'
import { CacheStore } from '../interfaces/cache-store.interface';
import { Region } from '../interfaces/region.type';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl: string ='https://restcountries.com/v3.1'

  public cacheStorage: CacheStore = {
    byCapital:  {term:'', countries:[]},
    byCountries:{term:'', countries:[]},
    byRegion:   {region:'', countries:[]},
  }

  // get httpParams (){
  //   return new HttpParams().set('fields','name,capital,flag,population');
  // }

  constructor( private http: HttpClient) {
    this.loadFormLocalStorage();
   }

  private saveToLocalStorage(){
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStorage))
  }

  private loadFormLocalStorage(){
    if(!localStorage.getItem('cacheStore')) return;

    this.cacheStorage = JSON.parse(localStorage.getItem('cacheStore')!);
  }
  private getCountriesRequest(url:string): Observable<Country[]>{
    return this.http.get<Country[]>(url)
    .pipe(
      catchError(() => of([])),
      // delay( 2000),
    );
  }

  searchCountryByAlphaCode( code: string ): Observable<Country | null> {

    const url = `${ this.apiUrl }/alpha/${ code }`;

    return this.http.get<Country[]>( url )
      .pipe(
        map( countries => countries.length > 0 ? countries[0]: null ),
        catchError( () => of(null) )
      );
  }

  searchCountry( termino: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/name/${termino}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( (countries) =>this.cacheStorage.byCountries = { term: termino, countries: countries}),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchCapital( termino: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${termino}`;
    return this.getCountriesRequest(url)
      .pipe(
        tap( (countries) =>this.cacheStorage.byCapital = { term: termino, countries: countries}),
        tap(() => this.saveToLocalStorage())
      );
  }

  searchRegion( region : Region ): Observable<Country[]> {

    const url = `${ this.apiUrl }/region/${region}`;
    return this.getCountriesRequest(url)
    .pipe(
      tap( (countries) =>this.cacheStorage.byRegion = { region: region, countries: countries}),
      tap(() => this.saveToLocalStorage())
    );
  }

  // return this.http.get<Country[]>(url ) //{params: this.httpParams}
  // .pipe(
  //   tap(console.log),
  //   catchError(() => of([]))
  // );

  getCountryForAlpha( id: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/alpha/${id}`;
    return this.getCountriesRequest(url);
  }
}
