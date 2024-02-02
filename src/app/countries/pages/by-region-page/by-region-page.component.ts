import { Component } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { CountryService } from '../../services/country.service';


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

export class ByRegionPageComponent {

regiones: string[] = ['africa','americas','asia','europe','oceania'];
regionActivate: string = '';
public countries: Country[]=[];

constructor( private countryService: CountryService ){}
  //private countryService: CountryService

  getClassCSS (region: string):string {
    return ( region === this.regionActivate) ? 'btn btn-primary' : 'btn btn-outline-primary'
  }

  activeRegion ( region :string ){

    if ( region === this.regionActivate){return;}
    this.regionActivate= region;
    this.countries=[]
    //TODO: hacer el llamado al servicio
    this.countryService.searchRegion(region)
    .subscribe( countries => {
      this.countries = countries;
    });
    // console.log(countries)
     //this.country = country)

  }

}
