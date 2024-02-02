import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { switchMap } from 'rxjs';

@Component({
  selector: 'search-country-page',
  templateUrl: './country-page.component.html',
  styles: [
  ]
})
export class CountryPageComponent implements OnInit{

  public country?: Country;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router:Router,
    private countriesService: CountryService,
    ){}
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.activatedRoute.params
      .pipe(
        switchMap( ({ id }) => this.countriesService.searchCountryByAlphaCode( id )),
      )
      .subscribe( country => {
        if ( !country ) return this.router.navigateByUrl('');
        return this.country = country;
      });
  }




}
