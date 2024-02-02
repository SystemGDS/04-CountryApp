import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'search-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: [
  ]
})
export class ByCountryPageComponent {
term : string ='';
error: boolean = false;
public countries: Country[]=[];

constructor(private countryService: CountryService ){}

  searchByCountry( term: string): void{
    this.error= false;
    this.term = term;

    this.countryService.searchCountry(term)
    .subscribe(countries => {
      this.countries = countries;
    });
  }
}
