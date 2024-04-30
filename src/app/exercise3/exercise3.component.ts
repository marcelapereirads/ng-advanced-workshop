import { Component } from '@angular/core';
import { Observable, combineLatest, combineLatestWith, filter, map, merge, startWith, tap } from 'rxjs';
import { Country, State } from './types';
import { CountryService } from './country.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-exercise3',
  templateUrl: './exercise3.component.html',
  styleUrls: ['./exercise3.component.css']
})
export class Exercise3Component {
  states$: Observable<State[]>;
  country!: Country;
  state!: State;
  countryControl = new FormControl('');

  countries$: Observable<Country[]> = this.service.getCountries().pipe(
    combineLatestWith(this.countryControl.valueChanges.pipe(startWith(''))),
    map(([countries, formValue]) =>
      countries.filter((country) => country.description.toLowerCase().includes(formValue.toLowerCase()))
    )
  );

  constructor(private service: CountryService) {}

  updateStates(country: Country) {
    this.countryControl.setValue(country.description);
    this.states$ = this.service.getStatesFor(country.id);
  }
}
