import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators';

import { Country } from '../interfaces/country.interface'

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private apiUrl: string ='https://restcountries.com/v3.1'

  // get httpParams (){
  //   return new HttpParams().set('fields','name,capital,flag,population');
  // }

  constructor( private http: HttpClient) { }

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
    return this.getCountriesRequest(url);
  }

  searchCapital( termino: string ): Observable<Country[]> {
    const url = `${ this.apiUrl }/capital/${termino}`;
    return this.getCountriesRequest(url);
  }

  searchRegion( region : string ): Observable<Country[]> {

    const url = `${ this.apiUrl }/region/${region}`;
    return this.getCountriesRequest(url);
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
