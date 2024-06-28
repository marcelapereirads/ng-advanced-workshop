import { Component, OnInit } from '@angular/core';
import { Observable, map, withLatestFrom } from 'rxjs';
import { Country, State } from './types';
import { CountryService } from './country.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-exercise3',
  templateUrl: './exercise3.component.html',
  styleUrls: ['./exercise3.component.css']
})
export class Exercise3Component implements OnInit {
  countries$: Observable<Country[]>;
  states$: Observable<State[]>;
  state: State;
  countryControl = new FormControl<string>('');

  constructor(private service: CountryService) {}

  ngOnInit() {
    this.countries$ = this.countryControl.valueChanges.pipe(
      withLatestFrom(this.service.getCountries()),
      map(([formValue, countries]) =>
        countries.filter((country) => country.description.toLowerCase().includes(formValue.toLowerCase()))
      )
    );
  }

  updateStates(country: Country) {
    this.countryControl.setValue(country.description);
    this.states$ = this.service.getStatesFor(country.id);
  }
}
