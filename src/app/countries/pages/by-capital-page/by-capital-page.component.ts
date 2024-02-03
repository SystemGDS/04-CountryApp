import { Component, OnInit } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';

@Component({
  selector: 'search-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: [
  ]
})
export class ByCapitalPageComponent implements OnInit {
term : string ='';
error: boolean = false;
public countries: Country[]=[];
public isLoading: boolean = false;
public initialValue: string = '';

constructor(private countryService: CountryService ){
  // private countryService: CountryService
}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.countries = this.countryService.cacheStorage.byCapital.countries;
    this.initialValue = this.countryService.cacheStorage.byCapital.term;
  }
searchByCapital( term: string): void{
  this.error= false;
  this.term = term;
  this.isLoading = true;

  this.countryService.searchCapital(term)
  .subscribe(countries => {
    this.countries = countries;
    this.isLoading = false;
  });
}
}
