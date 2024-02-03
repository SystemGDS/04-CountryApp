import { Component, OnInit } from '@angular/core';
import { CountryService } from '../../services/country.service';

import { Country } from '../../interfaces/country.interface';
import { Region } from '../../interfaces/region.type';


@Component({
  selector: 'search-by-region-page',
  templateUrl: './by-region-page.component.html',
  styles: [
    `
    button{
      margin-right: 5px;
    }
    `
  ],

})

export class ByRegionPageComponent implements OnInit{

  regionActivate: string = '';
  error: boolean = false;
  term: string = '';
  public isLoading: boolean = false;
  public countries: Country[]=[];
  public regions: Region[] = ['Africa','Americas','Asia','Europe','Oceania'];
  public initialValue: string = '';

constructor( private countryService: CountryService ){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.countries = this.countryService.cacheStorage.byRegion.countries
    this.regionActivate = this.countryService.cacheStorage.byRegion.region
  }
  //private countryService: CountryService

  getClassCSS (region: string):string {
    return ( region === this.regionActivate) ? 'btn btn-primary' : 'btn btn-outline-primary'
  }

  activeRegion ( region :Region ){

    if ( region === this.regionActivate){return;}
    this.regionActivate= region;
    this.countries=[]
    this.isLoading = true;
    this.error = true;
    //TODO: hacer el llamado al servicio
    this.countryService.searchRegion(region)
    .subscribe( countries => {
      this.term = region
      this.error = false;
      this.countries = countries;
      this.isLoading = false;
    });
    // console.log(countries)
     //this.country = country)

  }

}
