import { Component, OnInit } from '@angular/core';
import { Observable, switchMap } from 'rxjs';
import { Country, State } from './types';
import { CountryService } from './country.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-exercise2',
  templateUrl: './exercise2.component.html',
  styleUrls: ['./exercise2.component.css']
})
export class Exercise2Component implements OnInit {
  countries$: Observable<Country[]> = this.service.getCountries();
  states$: Observable<State[]>;
  countryDropdown = new FormControl<Country['id']>(null);
  stateDropdown = new FormControl<State['code']>(null);

  constructor(private service: CountryService) {}

  ngOnInit() {
    this.states$ = this.countryDropdown.valueChanges.pipe(
      switchMap((countryId: string) => this.service.getStates(countryId))
    );
  }
}
