import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Country, State } from './types';
import { FormControl } from '@angular/forms';
import { CountryService } from './country.service';
import { combineLatestWith, distinctUntilChanged, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-exercise4',
  templateUrl: './exercise4.component.html',
  styleUrls: ['./exercise4.component.css']
})
export class Exercise4Component {
  countries$: Observable<Country[]>;
  states$: Observable<State[]>;
  countryControl = new FormControl<string>('');
  stateControl = new FormControl<string>('');

  constructor(private service: CountryService) {
    this.countries$ = this.countryControl.valueChanges.pipe(
      //WithLatestFrom is used to get the countries from the service without continue listening to changes on it
      withLatestFrom(this.service.getCountries()),
      map(([userInput, countries]) =>
        countries.filter((c) => c.description.toLowerCase().indexOf((userInput ?? '').toLowerCase()) !== -1)
      )
    );

    this.states$ = this.stateControl.valueChanges.pipe(
      // combineLatestWith is used to listen to both, stateControl value changes and countries observable receiving a new value
      combineLatestWith(this.countries$),
      // switchMap to get the states every time the country or the control value for state changes
      switchMap((country) => {
        return this.service.getStatesFor(country[1][0].id);
      }),
      map((states, _) =>
        states.filter((s) => s.description.toLowerCase().indexOf((this.stateControl.value ?? '').toLowerCase()) !== -1)
      )
    );
  }

  updateStates(country: Country) {
    this.countryControl.setValue(country.description);
    this.stateControl.setValue('');
  }

  selectState(state: State) {
    this.stateControl.setValue(state.description ?? '');
  }
}
