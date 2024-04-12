import { Component, OnInit } from '@angular/core';
import { CountriesService } from './services/countries.service';
import { Country } from './exercise1.model';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-exercise1',
  templateUrl: './exercise1.component.html',
  styleUrls: ['./exercise1.component.css']
})
export class Exercise1Component implements OnInit {
  constructor(private countriesService: CountriesService) {}

  countries$: Observable<Country[]>;
  countryControl = new FormControl({ id: '', description: '' });

  ngOnInit() {
    this.countries$ = this.countriesService.getCountries();
  }
}
